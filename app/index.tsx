import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { configureSentry } from './helpers/sentry';
import Root from './pages/Root';
import { configureStore, history } from './store/configureStore';

import './app.global.css';

configureSentry();

const { persistor, store } = configureStore();

ReactDOM.render(
  <AppContainer>
    <Root store={store} history={history} persistor={persistor} />
  </AppContainer>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept('./pages/Root', () => {
    const NextRoot = require('./pages/Root');
    ReactDOM.render(
      <AppContainer>
        <NextRoot store={store} history={history} persistor={persistor} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
