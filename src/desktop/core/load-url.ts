import { join } from "path"
import { format } from "url"


export function loadURL(window: Electron.BrowserWindow, appPath: string,) {
    window.loadURL(
      format({
        pathname: join(appPath, "dist/index.html"),
        protocol: "file:",
        slashes: true,
      }),
    )
  }
