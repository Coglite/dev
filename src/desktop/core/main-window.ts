import { BrowserWindow } from "electron";
import { Constants } from "../constants";
import { logger, renderLogger } from "../logger";
import {EventEmitter} from 'events'


const devServerUrl = Constants.urls.main.dev;
const buildFileUrl = Constants.urls.main.prod;


export enum DesktopAppStatus {
    Closed,
    Loading,
    Initializing,
    Ready,
    FailedLoad,
}


export class DesktopState {
    status: DesktopAppStatus
}


export class MainWindow extends EventEmitter {

    public createWindow() {
        const mainWindow = new BrowserWindow({
            height: 1000,
            icon: Constants.urls.icon,
            width: 1600,
            show: true,
            webPreferences: {
                webSecurity: false,
                experimentalFeatures: true,
                experimentalCanvasFeatures: true

            },
        });

    const url = process.env.HOT ? devServerUrl : buildFileUrl;
        
        //this.setupDesktopEventHandlers(mainWindow);
        
        mainWindow.loadURL(url);

        return mainWindow;
}


}
