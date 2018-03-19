import { join } from "path"
import { format } from "url"


export function loadURL(window: Electron.BrowserWindow, appPath: string,) {
    window.loadURL(
      format({
        pathname: join(appPath, "dist/app.html"),
        protocol: "file:",
        slashes: true,
      }),
    )
  }
