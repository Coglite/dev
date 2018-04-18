export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error(err);
  }
};

/*
import { loadState, saveState } from './lib/local-storage';
const persistedState = loadState();
const store = createStore(rootReducer, persistedState,)
store.subscribe(() => {saveState(store.getState())});
*/