import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Router, Switch } from 'react-router';
import { CogliteApp } from './CogliteAppBase';
import { CogliteRoot } from './CogliteRoot';
import { Store } from '../stores';

@inject('nav')
@observer
class CogliteAppContainerBase extends React.Component {
render(){
const {nav} = this.props as Store
 return(
  <CogliteRoot>
    <Router history={nav.history}>
      <Switch>
        <Route path="/" component={CogliteApp} />
      </Switch>
    </Router>
  </CogliteRoot>
 )}
}


export let CogliteAppContainer = hot(module)(CogliteAppContainerBase)