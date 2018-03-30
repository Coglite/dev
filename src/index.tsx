import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Home from './containers/Home';
import {stores} from './stores';



ReactDOM.render(
    <Provider { ...stores }>
        <Home />
    </Provider>,
    document.getElementById('root')
);
