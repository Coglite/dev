const electron = require('electron');
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');


let win;

function createWindow () {

  let loadingWin = new BrowserWindow({
      width: 150, 
      height: 150, 
      frame: false,
      transparent: true
  });

  loadingWin.loadURL(path.join(__dirname, './loading.html'))
  loadingWin.show();

  win = new BrowserWindow({
    fullscreen:false,
    icon:'src/assets/images/PortableBoxAlpha2.png',
    show: false
  });
  
  win.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file:',
    slashes: true
  }))


  win.on('closed', () => {win = null})

   win.once('ready-to-show', () => {
       win.show()
       win.maximize()
       loadingWin.hide()
       loadingWin.close()
   })

}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {app.quit()}
})

app.on('activate', () => {
  if (win === null) {createWindow()}
})

