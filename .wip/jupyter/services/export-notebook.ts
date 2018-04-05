import * as path from "path";
import { writeFile } from "fs";

import {dialog, Notification} from 'electron'
const { stringifyNotebook } = require("@nteract/commutable");

import store from "./store";

export default function exportNotebook() {
  // TODO: Refactor to use promises, this is a bit "nested".
  const saveNotebook = function(filename) {
    if (!filename) {
      return;
    }
    const ext = path.extname(filename) === "" ? ".ipynb" : "";
    const fname = `${filename}${ext}`;
    
    writeFile(fname, stringifyNotebook(store.notebook), function(err, data) {
      if (err) {
        console.log("Error saving file", {
          detail: err.message
        });
      } else {
        console.log("Save successful", {
          detail: `Saved notebook as ${fname}`
        });
      }
    });
  };
  dialog.showSaveDialog(fname);
}