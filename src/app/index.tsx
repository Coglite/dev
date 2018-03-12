import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CogliteAppContainer} from './views/CogliteAppContainer';

import { createStores } from './stores';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';



// enable MobX strict mode
useStrict(true);

// default fixtures for TodoStore
//const defaultTodos = [
//  new TodoModel('Use Mobx'),
//  new TodoModel('Use React', true)
//];

// prepare MobX stores
const history = createBrowserHistory();
const rootStore = createStores(history);


ReactDOM.render(
  <Provider {...rootStore}>
    <CogliteAppContainer history={history} />
  </Provider>,
document.querySelector('#root'));
