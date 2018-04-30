import * as ReactDOM from "react-dom"
import * as React from "react"
import { AppView } from "./app"
import { cogStore } from "./stores"
import "./styles.css"
import "./setup.css"
import "./w3.css"
ReactDOM.render(<AppView {...cogStore} />, document.getElementById("root"))
