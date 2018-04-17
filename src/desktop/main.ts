import { app, dialog, ipcMain } from "electron"
import * as isDev from "electron-is-dev"
import * as log from "electron-log"
import { createMainWindow, loadURL } from "./main-window"
import { createMenu } from "./menus"
import { createUpdater } from "./updater"

log.transports.file.level = isDev ? false : "info"
log.transports.console.level = isDev ? "debug" : false

let window: Electron.BrowserWindow
let showStorybook = false

/** usually we'd just use __dirname here, however, the FuseBox
 bundler rewrites that, so we have to get it from Electron. **/
const appPath = app.getAppPath()

app.on("ready", () => {
  window = createMainWindow(appPath)
  createMenu(window)

  if (isDev) {
    window.webContents.on("did-fail-load", () => {
      dialog.showErrorBox(
        "Error opening storybook",
        'Storybook failed to open. Please ensure the storybook server is running by executing "npm run storybook"',
      )
    })

    ipcMain.on("storybook-toggle", () => {
      showStorybook = !showStorybook
      loadURL(window, appPath, showStorybook)
    })
  }
})

app.on("window-all-closed", app.quit)

createUpdater(app)
