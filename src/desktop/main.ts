import {app, BrowserWindow, Menu} from 'electron'
import * as path from 'path';
import {format} from 'url';
import { resolve } from 'app-root-path';

import { installExtensions } from './installExtensions';

const isProd = process.env.NODE_ENV === 'production' ? true : false;

(process as NodeJS.EventEmitter).on('uncaughtException', (error: Error) => {
    console.error(error);
    console.log('[err-desktop]', error.message.toString(), JSON.stringify(error.stack));
});

let mainWindow: any

let createMainWindow = async () => {
  

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      backgroundThrottling: false,
      textAreasAreResizable: false,
      nodeIntegrationInWorker: true,
      experimentalCanvasFeatures: true,
      experimentalFeatures: true
      }
  })
  


  const devPath = 'http://localhost:8080'; 
  const prodPath = format({
    pathname: resolve('dist/index.html'),
    protocol: 'file:',
    slashes: true
  });
  const url = isProd ? prodPath : devPath;
  mainWindow.loadURL(url);

  mainWindow.webContents.openDevTools()

  mainWindow.webContents.on("context-menu", (e: any, props: any) => {
      Menu.buildFromTemplate([{
          label: "Inspect element",
          click() { mainWindow.webContents.inspectElement(props.x, props.y)}}])
      .popup(mainWindow);
    })


  mainWindow.on('closed', function () {mainWindow = null})


installExtensions()

return mainWindow
}


app.on('ready', createMainWindow);



app.on('window-all-closed', async () => {
  await console.info('Desktop host gracefully shutting down...')
  if (process.platform !== 'darwin') {app.quit()}
});

app.on('activate', function () {
  if (mainWindow === null) {
    createMainWindow()
  }
});

process.on("SIGINT", () => {process.exit(-1);});

process.on("SIGINT", () => {process.exit(-2);});

