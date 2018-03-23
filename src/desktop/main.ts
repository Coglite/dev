// This is the main process entry point. It is the
// first file that is run on startup.
//
// It is responsible for launching a renderer window.

import { app, dialog } from "electron"
import { createMainWindow, loadURL } from "./core"
import * as log from "electron-log"
import * as isDev from "electron-is-dev"
import { createMenu } from "./menus"


let mainWindow: Electron.BrowserWindow

const appPath = app.getAppPath()


app.on("ready", () => {
  mainWindow = createMainWindow(appPath)
  createMenu(mainWindow)

//makes app single instance obviously..could cause problems if user WANTS to open multiple windows?
  const isSecondInstance = app.makeSingleInstance(() => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {mainWindow.restore()}
        mainWindow.show()
          }}); if (isSecondInstance) {app.quit()}

  if (isDev) {
    mainWindow.webContents.on("did-fail-load", () => {
      dialog.showErrorBox(
        "Error opening Coglite Desktop",
        'The Application failed to open. Ensure path to window file is correct"',
      )
    })

  }
})

app.on("window-all-closed", app.quit)

