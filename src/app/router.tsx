import {hot} from 'react-hot-loader'
import * as React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import { AppLayout } from './views/layout/AppLayout';
import {inject, observer} from 'mobx-react'

import RoutesStore from './stores/RouterStore';
import {PageRoutes} from './views/pages'

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
  <HashRouter history={router.history} >
    <AppLayout/> 
  </HashRouter>
  );
 }
}

export default hot(module)(CogliteAppRouter);
