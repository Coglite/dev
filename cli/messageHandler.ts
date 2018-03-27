import * as path from 'path'
const request = require('superagent');

const {
    writeWebpackConfigFile,
    writeIndexFile,
    writeFileContent,
    getStarterFileTemplate,
    cleanProjectDirectory,
    writePackageJson,
    readProjectFiles,
    createProjectFile,
    readProjectFile,
    deleteProjectFile,
    copyFilesToProjectDirectory
} = require('../src/lib/fileHandler');
const {initialize,onCreateProject} = require('../src/lib/middleMan/server');

const {
    installModuleToProjectDirectory,
    unInstallModuleToProjectDirectory,
    readDependencies,
    getComponentKitDetails
} = require('../src/lib/moduleHandler');

const {
    availableComponentKitsUrl
} = require('./constant');

const { readProjectConfig, changeActiveKit } = require('../lib/configManager');
const { getProjectDirectory } = require('../lib/locationService');
const createWebpackDevServer = require('./webpackServer');


let availableComponentKits = null;
let projectConfig = readProjectConfig();
const currentComponentKit = require(projectConfig.activeComponentKit);

/**
 * Writes the initial content to the project folder
 */
function writeFreshProjectToProjectDirectory() {
    writePackageJson(projectConfig.activeComponentKit);
    writeIndexFile(currentComponentKit.entryFilePath);
    copyFilesToProjectDirectory(currentComponentKit.files);
}

/**
 * Change the component kit
 */
function changeCurrentComponentKit(nameOfNewKit) {
    // clean the current project directory
    cleanProjectDirectory();

    // change the project config file with the new component kit name
    changeActiveKit(nameOfNewKit);

    // read the project config file again after change
    projectConfig = readProjectConfig();
   
   // write initial files
    writeFreshProjectToProjectDirectory();
}

/**
 * Fetches all the available component kit list from through the remote endpoint
 */
function fetchAllAvailableComponentKits() {
    return request
        .get(availableComponentKitsUrl)
        .send()
        .set('Accept', 'application/json');
}

/**
 * Read the webpack config from the current component kit
 */
function getWebpackConfig() {
    // while reading, pass the current project directory
    return currentComponentKit.webpackConfig(getProjectDirectory());
}

/**
 * Emits the list of files in the project directory through the socket.
 * This could be invoked when a file is deleted or created, to send the
 * new list of files to the front-end UI.
 */
function emitCurrentProjectFiles(socket) {
    readProjectFiles().then((files) => {
        socket.emit('projectFileInfo', {
            files: files,
            entryFile: path.basename(currentComponentKit.entryFilePath)
        });
    });
}

/**
 * Initializes the messaging handlers and start webpack dev server
 */
export function initializeMessageHandler(serverApp, webpackDevServerPort) {
    initialize(serverApp, {
        /**
         * When a project is newly created
         */
        onCreateProject: (data) => {
            writeFreshProjectToProjectDirectory();
        },

        /**
         * When a connection is established with the front-end UI
         */
        onConnection: (socket) => {
            socket.emit('initialConfig', projectConfig);
            console.log(currentComponentKit.kit)
            socket.emit('componentKit', currentComponentKit.kit);
            socket.emit('packageInfo', readDependencies());
            socket.emit('webpackDetail', webpackDevServerPort);
            emitCurrentProjectFiles(socket);
            fetchAllAvailableComponentKits()
                .end((err, res) => {
                    if (!err) {
                        availableComponentKits = JSON.parse(res.text);
                        socket.emit('componentKitInfo', getComponentKitDetails(readDependencies(), availableComponentKits));
                    }
                });
            socket.emit('readProjectFile', readProjectFile(path.basename(currentComponentKit.entryFilePath)));
        },

        /**
         * When a file should be saved. File name and content should be provided
         */
        onCodeChange: (data) => {
            writeFileContent(data.fileName, data.content);
        },

        /**
         * When the active component kit is changed
         */
        onKitChange: (kit, socket) => {
            changeCurrentComponentKit(kit);
            socket.emit('componentKit', currentComponentKit.kit);
            readProjectFiles().then((files) => {
                socket.emit('projectFileInfo', {
                    files: files,
                    entryFile: path.basename(currentComponentKit.entryFilePath)
                });
            });
            createWebpackDevServer(getWebpackConfig(), webpackDevServerPort);
        },

        /**
         * When a npm module is installed
         */
        onModuleInstall: (moduleName, socket) => {
            installModuleToProjectDirectory(moduleName)
                .then((detail) => {
                    socket.emit('message', {
                        messageType: 'success',
                        message: 'Installed ' + detail.name + '@' + detail.version
                    });
                    socket.emit('packageInfo', readDependencies());
                })
                .catch(() => {
                    socket.emit('message', {
                        messageType: 'error',
                        message: 'Installation of ' + moduleName + ' failed'
                    });
                });
        },

        /**
         * When an npm module is un-installed
         */
        onModuleUninstall: (moduleName, socket) => {
            unInstallModuleToProjectDirectory(moduleName)
                .then(() => {
                    socket.emit('message', {
                        messageType: 'error',
                        message: 'Uninstalled ' + moduleName
                    });
                    socket.emit('packageInfo', readDependencies());
                })
                .catch(() => {
                    socket.emit('message', {
                        messageType: 'error',
                        message: 'Uninstallation of ' + moduleName + ' failed'
                    });
                });
        },

        /**
         * When an installed compoennt kit should be uninstalled
         */
        onComponentKitUninstall: (moduleName, socket) => {
            unInstallModuleToProjectDirectory(moduleName)
                .then(() => {
                    socket.emit('message', {
                        messageType: 'error',
                        message: 'Uninstalled ' + moduleName
                    });
                    socket.emit('packageInfo', readDependencies());
                    socket.emit('componentKitInfo', getComponentKitDetails(readDependencies(), availableComponentKits));
                })
                .catch(() => {
                    socket.emit('message', {
                        messageType: 'error',
                        message: 'Uninstallation of ' + moduleName + ' failed'
                    });
                });
        },

        /**
         * When a component kit should be installed
         */
        onComponentKitInstall: (moduleName, socket) => {
            installModuleToProjectDirectory(moduleName)
                .then((detail) => {
                    socket.emit('message', {
                        messageType: 'success',
                        message: 'Installed ' + detail.name + '@' + detail.version
                    });
                    socket.emit('packageInfo', readDependencies());
                    socket.emit('componentKitInfo', getComponentKitDetails(readDependencies(), availableComponentKits));
                })
                .catch(() => {
                    socket.emit('message', {
                        messageType: 'error',
                        message: 'Installation of ' + moduleName + ' failed'
                    });
                });
        },

        /**
         * When a new file should be created
         */
        onCreateNewFile: (fileName, socket) => {
            createProjectFile(fileName);
            emitCurrentProjectFiles(socket);
        },

        /**
         * When a file is selected, the content should be read and given
         */
        onReadFile: (fileName, socket) => {
            socket.emit('readProjectFile', readProjectFile(fileName));
        },

        /**
         * When a file should be deleted
         */
        onDeleteFile: (fileName, socket) => {
            deleteProjectFile(fileName);
            emitCurrentProjectFiles(socket);
        }
    });

    createWebpackDevServer(getWebpackConfig(), webpackDevServerPort);
}


