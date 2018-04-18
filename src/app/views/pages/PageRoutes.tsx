import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NotebookPage, DatasetsPage, ChartsPage, DashboardPage, CloudPage, SettingsPage, AboutPage } from '.'
import Canvas from "./Diagram/Canvas"



export let PageRoutes = (props) => {
  return(
    <Switch>
        <Route path='/pages/dashboard' component={DashboardPage} />
          <Route path='/pages/notebook' render={() => <NotebookPage />}/>
          <Route path='/pages/datasets' component={DatasetsPage} />
          <Route path='/pages/diagram' render={() => <Canvas num="2" someProp={100} />} />
          <Route path='/pages/charts' component={ChartsPage} />
          <Route path='/pages/cloud' component={CloudPage} />
          <Route path='/pages/settings' component={SettingsPage} />
          <Route path='/pages/about' component={AboutPage} />
          <Route path='*' component={DashboardPage} />
    </Switch>
  )}