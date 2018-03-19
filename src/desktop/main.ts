const path = require('path')

import { app, dialog } from "electron"
import { createMainWindow, loadURL } from "./main-window"
import * as isDev from "electron-is-dev"
import { createMenu } from "./menus"

//import * as log from "electron-log"
//import { createUpdater } from "./updater"

const appPath = app.getAppPath()

require('electron-reload')(__dirname, {
    electron: appPath,
    hardResetMethod: 'exit'
  });


let window: any

app.on("ready", () => {
  window = createMainWindow(appPath)
  createMenu(window)

  if (isDev) {
    window.webContents.on("did-fail-load", () => {
      dialog.showErrorBox(
        "Error opening Coglite Desktop",
        'The Application failed to open. Ensure path to window file is correct"',
      )
    })

  }
})

app.on("window-all-closed", app.quit)

// setup the auto-updater
//createUpdater(app)
