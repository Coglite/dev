import {app, BrowserWindow, Menu} from 'electron'
import * as path from 'path';
import {format} from 'url';
//import { resolve } from 'app-root-path';
import { installExtensions } from './installExtensions';



let mainWindow: any


(process as NodeJS.EventEmitter).on('uncaughtException', (error: Error) => {
    console.error(error);
    console.log('[err-desktop]', error.message.toString(), JSON.stringify(error.stack));
});


const cogliteAppHTML = process.env.ELECTRON_DEV_URL || format({
    pathname: path.join(__dirname, 'app.html'),
    protocol: 'file:',
    slashes: true });


let createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      backgroundThrottling: false,
      textAreasAreResizable: false,
      nodeIntegrationInWorker: true,
      experimentalCanvasFeatures: true,
      experimentalFeatures: true,
      plugins: true,
      }
  });
  
  mainWindow.loadURL(cogliteAppHTML);

  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on("context-menu", (e: any, props: any) => {
      Menu.buildFromTemplate([{
          label: "Inspect element",
          click() { mainWindow.webContents.inspectElement(props.x, props.y)}}])
     .popup(mainWindow);
    });


mainWindow.on('closed', function () {
  mainWindow = null
  //process.kill(process.pid)
  });

installExtensions()

return mainWindow

};


app.on('ready', createMainWindow);

app.on('window-all-closed', async () => {
  await console.info('Coglite Desktop Succesfully Closed')
  if (process.platform !== 'darwin') {app.quit()}
});



process.on("SIGINT", () => {process.exit(-1);});
process.on("SIGINT", () => {process.exit(-2);});