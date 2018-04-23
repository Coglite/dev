import * as React from "react"
import { Switch, Route } from "react-router-dom"
import Canvas from "./views/pages/Diagram/Canvas"
import {
  NotebookPage,
  DatasetsPage,
  ChartsPage,
  DashboardPage,
  CloudPage,
  SettingsPage,
  AboutPage,
} from "./views/pages"


export default () => (
  <Switch>
    <Route path="/second" render={() => <Canvas num="2" someProp={100} />} />
    <Route path="/" render={() => <Canvas num="2" someProp={100} />} />
    <Route path="/pages/dashboard" component={DashboardPage} />
    <Route path="/pages/notebook" component={NotebookPage} />
    <Route path="/pages/datasets" component={DatasetsPage} />
    <Route path="/pages/charts" component={ChartsPage} />
    <Route path="/pages/cloud" component={CloudPage} />
    <Route path="/pages/settings" component={SettingsPage} />
    <Route path="/pages/about" component={AboutPage} />
    <Route path="*" component={DashboardPage} />
  </Switch>
)
