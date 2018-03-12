import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from 'react-router';
import { CogliteRoot } from './CogliteRoot';
import { CogliteAppBase } from './CogliteAppBase';

// render react DOM
export const CogliteAppContainer = hot(module)(({ history }) => (
  <CogliteRoot>
    <Router history={history}>
      <Switch>
        <Route path="/" component={CogliteAppBase} />
      </Switch>
    </Router>
  </CogliteRoot>
));
