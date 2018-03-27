/**
 * Entry of the app
 */

import * as React from 'react';
import { Provider } from 'mobx-react';
import * as ReactDOM from 'react-dom';
import * as stores from './stores';
import Home from './containers/Home';


ReactDOM.render(
    <Provider { ...stores }>
        <Home />
    </Provider>,
    document.getElementById('root')
);
