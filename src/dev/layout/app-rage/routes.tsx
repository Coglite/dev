import * as React from "react"
import { Route, Switch } from "react-router-dom"
import {
  AboutPage,
  ChartsPage,
  CloudPage,
  DashboardPage,
  DatasetsPage,
  SettingsPage,
} from "./components"

import { NotebookView } from "./components/notebook/View"

export let AppRoutes = props => (
  <Switch>
    <Route path="/" component={NotebookView} />
    <Route path="/pages/dashboard" component={DashboardPage} />
    <Route path="/pages/notebook" component={NotebookView} />
    <Route path="/pages/datasets" component={DatasetsPage} />
    <Route path="/pages/charts" component={ChartsPage} />
    <Route path="/pages/cloud" component={CloudPage} />
    <Route path="/pages/settings" component={SettingsPage} />
    <Route path="/pages/about" component={AboutPage} />
    <Route path="*" component={DashboardPage} />
  </Switch>
)
