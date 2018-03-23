import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { NavigationStore } from './stores';
import { CogliteAppContainer } from './views/CogliteAppContainer';


const store = {
nav: new NavigationStore()
}


ReactDOM.render(
  <Provider {...store}>
    <CogliteAppContainer/>
  </Provider>,
document.querySelector('#root'));
