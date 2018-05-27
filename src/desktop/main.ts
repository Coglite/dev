require('dotenv').config()
import { app, BrowserWindow, Menu } from "electron";

//import { setMenu } from './menu'
import { store } from "./store";

let mainWindow;

//dont open devtools in this function or u'll get error spam on startup
export let createMainWindow = async () => {
    mainWindow = new BrowserWindow({
        width: 960,
        height: 640,
        webPreferences: {   
            webSecurity: false,
            experimentalFeatures: true,
            experimentalCanvasFeatures: true,
            plugins: true
        }
    });

    mainWindow.loadURL(`file:///${app.getAppPath()}/build/app/index.html`);


    mainWindow.webContents.on("context-menu", (e: any, props: any) => {
      Menu.buildFromTemplate([{
          label: "Inspect element",
          click() { mainWindow.webContents.inspectElement(props.x, props.y)}}])
      .popup(mainWindow as any);
    });


    const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, MOBX_DEVTOOLS } = require('electron-devtools-installer');
        installExtension(REACT_DEVELOPER_TOOLS);
        installExtension(MOBX_DEVTOOLS);
        installExtension(REDUX_DEVTOOLS);

    //mainWindow.on('closed', () => {mainWindow = null, process.kill(process.pid)});
    mainWindow.on("close", () => {mainWindow = null}); //not sure which is better to use here?
    
    return mainWindow
};


app.on("ready", async () => {
    //setMenu()
    store.dispatch({ type: 'NEW_WINDOW' }) 
    });

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        store.dispatch({ type: 'NEW_WINDOW' })
    }
});
