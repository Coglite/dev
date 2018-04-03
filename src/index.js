import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import App from './App';
import './index.css';
import { indexBy } from './utils';
import missions from './data/missions';
import companies from './data/companies';
import workers from './data/workers';
import reducer from './reducers';

const indexById = indexBy('id');

const initialState = {
  missions: {
    collection: indexById(missions),
    sort: {
      id: 'name',
      direction: true, // true is asc and false is desc
    },
    filter: 'all',
    spotlight: '',
    availableSorts: ['name', 'startDate', 'endDate'],
    availableFilters: ['open', 'close', 'all'],
  },
  workers: indexById(workers),
  companies: indexById(companies),
};

const logger = createLogger({ collapsed: true });
const store = createStore(reducer(initialState), applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
