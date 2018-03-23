import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Router, Switch } from 'react-router';

import { CogliteAppBase } from './CogliteAppBase';
import { CogliteRoot } from './CogliteRoot';
import { NavigationStore } from '../stores';

interface AppProps {
  nav?: NavigationStore
}

@inject('nav')
@observer
class CogliteAppContainerBase extends React.Component {
render(){
const {nav} = this.props as AppProps
 return(
  <CogliteRoot>
    <Router history={nav.history}>
      <Switch>
        <Route path="/" component={CogliteAppBase} />
      </Switch>
    </Router>
  </CogliteRoot>
 )}
}


export let CogliteAppContainer = hot(module)(CogliteAppContainerBase)