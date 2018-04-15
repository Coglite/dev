import { app } from "electron";
import * as mkdirp from "mkdirp";
import * as net from "net";
import * as path from "path";
import {normalize} from 'path';
import {homedir} from 'os';

var jetpack = require('fs-jetpack')
const APP_ROOT_DIR = jetpack.cwd(app.getAppPath());

const packageJson = APP_ROOT_DIR.read("package.json", "json");


const apiUrl = 'http://localhost:3500'
const localDBname = 'coglite'
const cogliteDir = normalize(`${homedir()}/.coglite/`);
const uploadDir = normalize(`${homedir()}/.coglite/uploads/`);


// Root is relative to where this file is when in the build folder)
//const root = path.join(__dirname, "../..");
const root = path.join(app.getAppPath());


const portrange = 45032;
function getPort(port = portrange): Promise<number> {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.listen(port, (err) => {
            server.once("close", () => {
                resolve(port);
            });
            server.close();
        });
        server.on("error", (err) => {
            getPort(port + 1).then((x) => {
                resolve(x);
            });
        });
    });
}


const urls = {
    main: {
        dev: "http://localhost:8080/",
        prod: `file://${__dirname}/../../build/index.html`,
    },
    splash: {
        dev: `file://${root}/src/server/splash-screen/splash-screen.html`,
        prod: `file://${root}/build/server/splash-screen/splash-screen.html`,
    },
    recover: {
        dev: `file://${root}/src/server/recover-window/recover-window.html`,
        prod: `file://${root}/build/server/recover-window/recover-window.html`,
    },
    
    icon: __dirname + "/../assets/images/icon.ico",

};

const isAsar = process.mainModule.filename.indexOf("app.asar") !== -1;
const logsFolder = isAsar ? path.join(app.getPath("userData"), "logs") : path.join(root, "logs");

const resourcesFolder = isAsar ? path.normalize(path.join(root, "..")) : root;

mkdirp.sync(logsFolder);

const pythonServerPort = {
    dev: Promise.resolve(8765),
    prod: getPort(),
};

const customProtocolName = 'coglite'

export const Constants = {
    isAsar,
    isDev: !isAsar,
    root,
    urls,
    logsFolder,
    resourcesFolder,
    pythonServerPort,
    version: packageJson.version,
    customProtocolName
};
