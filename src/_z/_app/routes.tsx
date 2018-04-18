import * as React from "react"
import { Switch, Route } from "react-router-dom"
import Canvas from "./views/pages/Diagram/Canvas"

export default () => (
  <Switch>
    <Route path="/second" render={() => <Canvas num="2" someProp={100} />} />
    <Route path="/" render={() => <Canvas num="2" someProp={100} />} />
  </Switch>
)
