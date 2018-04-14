import * as os from 'os'
import {EventEmitter} from 'events'
import { app, ipcMain } from "electron";
import {Constants} from '../constants'
import { logger } from "../logger";
import { MainWindow } from "./main-window";
import {isNullOrUndefined} from 'util'

const osName = `${os.platform()}-${os.arch()}/${os.release()}`;
const isDev = Constants.isDev ? "-dev" : "";
const userAgent = `(${osName}) Coglite/${Constants.version}${isDev}`;



export class CogliteDesktopApp extends EventEmitter {
    public mainWindow = new MainWindow();

/** create entry window (main window for now) and python or whatever else  */
    public async start() {
        this.mainWindow.createWindow();
    }


    public async registerCoreServices() {
        this._registerLifeCycleEventHandlers()
        this._registerCustomProtocol()
    }



   private _registerLifeCycleEventHandlers() {     
        
        app.on("window-all-closed", () => {
            if (process.platform !== "darwin") {
                app.quit();
            }
        });

        app.on("activate", () => {
            if (isNullOrUndefined(this.mainWindow) === true) {
                this.start()               
            }
                
        });

        ipcMain.once("exit", () => {process.exit(1)});

        process.on("uncaughtException" as any, (error: Error) => {
            logger.error("There was a uncaught exception", error);
        });

//not sure if this is gonna cause problems -- we ref'd the window variable already, but we havn't yet created the window
        this.mainWindow.on("closed", () => {
            logger.info(`Window ${this.constructor.name} closed. Quiting the app.`);
            app.quit();
        });

        ipcMain.once("exit", () => {
            process.exit(1);
        });

        process.on("uncaughtException" as any, (error: Error) => {
            logger.error("There was a uncaught exception", error);
            //this.recoverWindow.createWithError(error.message);
        });

        process.on("unhandledRejection", r => {
            logger.error("Unhandled promise error:", r);
        });
}


private _registerCustomProtocol() {
        if (Constants.isDev) {
            return;
        }
        if (app.setAsDefaultProtocolClient(Constants.customProtocolName)) {
            logger.info(`Registered ${Constants.customProtocolName}:// as a protocol for coglite desktop`);
        } else {
            logger.error(`Failed to register ${Constants.customProtocolName}:// as a protocol for coglite desktop`);
        }
    }
    
    public quit() {
        app.quit()
    }

}
