import {app, BrowserWindow, Menu} from 'electron'
import * as path from 'path';
import {format} from 'url';
import { resolve } from 'app-root-path';

import { installExtensions } from './installExtensions';


var isProd = process.env.NODE_ENV === 'production' ? true : false;
let mainWindow: any


(process as NodeJS.EventEmitter).on('uncaughtException', (error: Error) => {
    console.error(error);
    console.log('[err-desktop]', error.message.toString(), JSON.stringify(error.stack));
});


  const devPath = format({
    pathname: '//localhost:8888/',
    protocol: 'http:',
    slashes: true
  });

  const prodPath = format({
    pathname: resolve('dist/app/index.html'),
    protocol: 'file:',
    slashes: true
  });
  var url = isProd ? prodPath : devPath;



let createMainWindow = async () => {
  installExtensions();
  
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: false,
      backgroundThrottling: false,
      textAreasAreResizable: false,
      nodeIntegrationInWorker: true,
      experimentalCanvasFeatures: true,
      experimentalFeatures: true
      }
  });
  

  mainWindow.loadURL(url);

  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on("context-menu", (e: any, props: any) => {
      Menu.buildFromTemplate([{
          label: "Inspect element",
          click() { mainWindow.webContents.inspectElement(props.x, props.y)}}])
      .popup(mainWindow);
    });


mainWindow.on('closed', function () {
  mainWindow = null
  process.kill(process.pid)
  });

return mainWindow

};


app.on('ready', createMainWindow);


app.on('window-all-closed', async () => {
  await console.info('Coglite Desktop Succesfully Closed')
  //take this out in prod
  //process.kill(process.pid);
  if (process.platform !== 'darwin') {app.quit()}
});

app.on('activate', function () {
  if (mainWindow === null) {
    createMainWindow()
  }
});



process.on("SIGINT", () => {process.exit(-1);});
process.on("SIGINT", () => {process.exit(-2);});

