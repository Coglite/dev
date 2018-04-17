import * as React from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import {
  NotebookPage,
  DatasetsPage,
  ChartsPage,
  DashboardPage,
  CloudPage,
  SettingsPage,
  AboutPage,
} from "."

export let PageRoutes = () => {
  return (
    <Switch>
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
}
