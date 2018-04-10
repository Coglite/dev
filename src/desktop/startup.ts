import { app, protocol } from "electron";
import * as path from "path";
import { listenToSelectCertifcateEvent } from "./core";
import { PythonRpcServerProcess } from "./python-process";
import { CogliteDesktopApp } from "./core";
import { Constants } from "./constants";



const pythonServer = new PythonRpcServerProcess();
pythonServer.start();

var cogliteApp


function registerAuthProtocol() {
    protocol.registerStringProtocol("urn", (request, callback) => {
        callback();
    });
}

async function startApplication(cogliteApp: CogliteDesktopApp) {
    registerAuthProtocol();
    cogliteApp.registerCoreServices().then(() => {
        cogliteApp.start();
    });
}

export async function startCogliteDesktop() {
    //localStorage.load();
    const cogliteApp = new CogliteDesktopApp();
    if (app.isReady()) {
        startApplication(cogliteApp);
    } else {
        app.on("ready", async () => {
            startApplication(cogliteApp);
        });
    }


listenToSelectCertifcateEvent();

process.on("exit", () => {
    cogliteApp.quit()
    pythonServer.stop();
});

process.on("SIGINT", () => {
    process.exit(-1);
});

process.on("SIGINT", () => {
    process.exit(-2);
});

}
