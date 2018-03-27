var npmi = require('npmi');
var npm = require('npm-programmatic');
var path = require('path');
var fs = require('fs-extra');

import { getProjectDirectory } from './locationService';

export function installModuleToProjectDirectory(name) {
    return new Promise(function (resolve, reject) {
        var options = {
            name: name,
            version: 'latest',
            path: getProjectDirectory(),
            forceInstall: false,
            npmLoad: {
                loglevel: 'silent',
                save: true
            }
        };
        npmi(options, function (err, result) {
            if (err) {
                reject(err.message);
            }

            // installed 
            resolve({
                name: options.name,
                version: options.version,
                path: path.resolve(options.path)
            });
        });
    });
}

export function unInstallModuleToProjectDirectory(moduleName) {
    return npm.uninstall(moduleName, {
        cwd: getProjectDirectory(),
        save: true
    });
}

export function readDependencies() {
    var packageJsonFilePath = path.join(getProjectDirectory(), 'package.json');
    if (fs.existsSync(packageJsonFilePath)) {
        return fs.readJsonSync(packageJsonFilePath, { throws: false });
    } else {
        return null;
    }
}

export function getComponentKitDetails(packageDependencies, availableKitsForInstall) {
    var uninstalledKits = [];
    var installedKits = [];

    for (var i = 0; i < availableKitsForInstall.componentKits.length; i++) {
        var componentKit = availableKitsForInstall.componentKits[i];
        if (packageDependencies && packageDependencies.dependencies[componentKit.name]) {
            installedKits.push({
                name: componentKit.name,
                label: componentKit.label,
                version: packageDependencies.dependencies[componentKit.name]
            });
        } else {
            uninstalledKits.push({
                name: componentKit.name,
                label: componentKit.label
            });
        }
    }
    return {
        installedKits: installedKits,
        uninstalledKits: uninstalledKits
    };
}

