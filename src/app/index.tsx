import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { store } from './stores';
import { CogliteAppContainer } from './modules/CogliteAppContainer';



ReactDOM.render(
  <Provider {...store}>
    <CogliteAppContainer/>
  </Provider>,
document.querySelector('#root'));
