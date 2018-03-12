// This is the main process entry point. It is the
// first file that is run on startup.
//
// It is responsible for launching a renderer window.

import { app, dialog } from "electron"
import { createMainWindow, loadURL } from "./main-window"
import * as log from "electron-log"
import * as isDev from "electron-is-dev"
//import { createUpdater } from "./updater"
import { createMenu } from "./menus"

// set proper logging level
log.transports.file.level = isDev ? false : "info"
log.transports.console.level = isDev ? "debug" : false

let window: Electron.BrowserWindow

const appPath = app.getAppPath()


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
