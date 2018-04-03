import { combineReducers } from 'redux';
import missions from './missions';

export default (initialState) => combineReducers({
  missions: missions(initialState.missions),
  companies: () => initialState.companies,
  workers: () => initialState.workers,
});
