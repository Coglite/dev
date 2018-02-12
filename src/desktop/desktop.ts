import * as path from "path";
import * as url from "url";
import { app, Menu } from "electron";
import {setApplicationMenu} from './menus'
import {createWindow} from "./createMainWindow";


app.on("ready", () => {
setApplicationMenu();

let mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: { webSecurity: false,
                      experimentalFeatures: true,
                      experimentalCanvasFeatures: true
                    }
  });

  
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "app.html"),
      protocol: "file:",
      slashes: true
    })
  );

mainWindow.openDevTools();
})



app.on("window-all-closed", () => {
  app.quit();
});

