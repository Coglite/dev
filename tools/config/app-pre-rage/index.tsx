import * as ReactDOM from "react-dom"
import * as React from "react"
import { AppView } from "./app"
import { cogStore } from "./stores"
import "./styles.css"
import "./setup.css"

ReactDOM.render(<AppView {...cogStore} />, document.getElementById("root"))
