import * as React from "react"
import { Route, Switch } from "react-router-dom"

import Canvas from "./Diagram/Canvas"

export let CogliteNotebookRoutes = props => (
  <Switch>
    <Route path="/" render={() => <Canvas num="2" someProp={100} />} />
    <Route path="/second" render={() => <Canvas num="2" someProp={100} />} />
  </Switch>
)
