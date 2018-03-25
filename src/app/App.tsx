import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Router, Switch } from 'react-router';
import { Store } from './stores';
import { PasswordModal } from './components/PasswordModal';
import {Div} from 'glamorous'


@inject('nav')
@observer
class CogliteAppBase extends React.Component {
renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return <DevTools />;
    }
  }

render(){
const {nav} = this.props as Store
 return(
  <Div>
    <Router history={nav.history}>
      <Switch>
        <Route path="/" component={PasswordModal} />
      </Switch>
    </Router>
    {this.renderDevTool()}
  </Div>
 )}
}

export let CogliteApp = hot(module)(CogliteAppBase)