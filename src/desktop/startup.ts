import { app, protocol } from "electron";
import * as path from "path";
import { listenToSelectCertifcateEvent } from "./core";
import { PythonRpcServerProcess } from "./python-process";
import { CogliteDesktopApp } from "./core";
import { Constants } from "./constants";


//app.setPath("userData", path.join(app.getPath("appData"), "coglite"));


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


//app.on("ready", startCogliteDesktop);

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

//startApplication()
// Creates the browser window.
// This call needs to be done after electron app is ready.
// Doesn't matter how the protocol is handled; error is fine 