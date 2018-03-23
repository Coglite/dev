import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { NavigationStore } from './stores';
import { CogliteAppContainer } from './views/CogliteAppContainer';

useStrict(true);

const store = {
nav: new NavigationStore()
}


ReactDOM.render(
  <Provider {...store}>
    <CogliteAppContainer/>
  </Provider>,
document.querySelector('#root'));
