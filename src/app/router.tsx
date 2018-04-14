import {hot} from 'react-hot-loader'
import * as React from 'react';
import {Router, Route, Switch} from 'react-router'
import { AppLayout } from './app-layout/AppLayout';
import {inject, observer} from 'mobx-react'

import RoutesStore from './stores/RouterStore';

interface RouterProps {
  router: RoutesStore;
}

@inject('router')
@observer
export class CogliteAppRouter extends React.Component<any, any> {  
    constructor(props: any, context?: any) {
        super(props);
    }

render() {
const {router} = this.props as RouterProps;

return (
  <Router history={router.history} >
    <Switch>
      <Route exact path="/" component={AppLayout} />
    </Switch>
  </Router>
  );
 }
}

export default hot(module)(CogliteAppRouter);
