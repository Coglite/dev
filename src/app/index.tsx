import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { CogliteApp } from './App';
import { store, Store } from './stores';



ReactDOM.render(
  <Provider {...store as Store}>
    <CogliteApp/>
  </Provider>,
document.querySelector('#root') as HTMLElement);
