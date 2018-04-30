// This is the entry point for the renderer process.
//
// Here we disable a few electron settings and mount the root component.

import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppView } from "./app"
import { webFrame } from "electron"

import { cogStore } from "./stores"

import "./styles.css"

webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)

document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())

ReactDOM.render(<AppView {...cogStore} />, document.getElementById("root"))
