import * as ReactDOM from 'react-dom'
import * as React from 'react'
import {CogliteRoot} from './CogliteRoot'


import { createHashHistory } from "history"
import { RouterStore, syncHistoryWithStore } from "mobx-react-router"

const browserHistory = createHashHistory()
const routingStore = new RouterStore()

import "./styles.css"

const history = syncHistoryWithStore(browserHistory, routingStore)



ReactDOM.render(<CogliteRoot history={history} />, document.getElementById("root"));