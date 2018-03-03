import './styles/main.scss';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/sql/sql.js';
import 'sql-formatter/dist/sql-formatter.js';

import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { JsonCodeMirrorStore } from './stores/JsonCodeMirrorStore';
import { JsonFormatterStore } from './stores/JsonFormatterStore';
import { QrcodeStore } from './stores/QrcodeStore';
import { RouterStore } from './stores/RouterStore';
import { SqlCodeMirrorStore } from './stores/SqlCodeMirrorStore';
import { SqlFormatterStore } from './stores/SqlFormatterStore';




const stores = {
  router: new RouterStore(),
  sqlFormatter: new SqlFormatterStore(),
  sqlCodeMirror: new SqlCodeMirrorStore(),
  jsonFormatter: new JsonFormatterStore(),
  jsonCodeMirror: new JsonCodeMirrorStore(),
  qrcode: new QrcodeStore(),
};

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('app') as HTMLElement
);
registerServiceWorker();
