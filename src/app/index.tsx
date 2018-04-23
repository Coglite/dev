// This is the entry point for the renderer process.
//
// Here we disable a few electron settings and mount the root component.

import * as React from "react"
import * as ReactDOM from "react-dom"
import { createBrowserHistory } from "history"
import { RouterStore, syncHistoryWithStore } from "mobx-react-router"
import { App } from "./app"
import { webFrame } from "electron"
const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()

import "./styles.css"

const history = syncHistoryWithStore(browserHistory, routingStore)

webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)

document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())

ReactDOM.render(<App history={history} />, document.getElementById("root"))
