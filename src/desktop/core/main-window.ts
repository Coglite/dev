import { BrowserWindow, Menu } from 'electron';
import * as WindowStateManager from 'electron-window-state-manager';

import { loadURL } from './load-url';


export const DIMENSIONS = { width: 600, height: 500, minWidth: 450, minHeight: 450 }

/**
 * Creates the main window.
 *
 * @param appPath The path to the bundle root.
 * @param showDelay How long in ms before showing the window after the renderer is ready.
 * @return The main BrowserWindow.
 */
export function createMainWindow(appPath: string, showDelay: number = 100) {
  const windowState = new WindowStateManager("main", {
    defaultWidth: DIMENSIONS.width,
    defaultHeight: DIMENSIONS.height,
  })


  const window = new BrowserWindow({
    minWidth: DIMENSIONS.minWidth,
    minHeight: DIMENSIONS.minHeight,
    width: windowState.width,
    height: windowState.height,
    x: windowState.x,
    y: windowState.y,
    show: false,
    useContentSize: true,
    titleBarStyle: "hidden-inset",
    autoHideMenuBar: false,
    title: "Coglite",
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      backgroundThrottling: false,
      textAreasAreResizable: false,
      nodeIntegrationInWorker: true,
      experimentalCanvasFeatures: true,
      experimentalFeatures: true  

    },
  })

  // maximize if we did before
  if (windowState.maximized) {
    window.maximize()
  }

  // trap movement events
  window.on("close", () => windowState.saveState(window))
  window.on("move", () => windowState.saveState(window))
  window.on("resize", () => windowState.saveState(window))

  // load entry html page in the renderer.
  loadURL(window, appPath)

  // only appear once we've loaded
  window.webContents.on("did-finish-load", () => {
    setTimeout(() => {
      window.show()
      window.focus()
    }, showDelay)
  })

   // this adds 'inspect element' on right click in the browser
  window.webContents.on("context-menu", (e, props) => {
      Menu.buildFromTemplate([
        {
          label: "Inspect element",
          click() { window.webContents.inspectElement(props.x, props.y)}
        }
      ]).popup(window);
    })


  return window
}
