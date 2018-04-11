import { Store } from 'redux';
import { persistStore as persistStoreRedux } from 'redux-persist';
import { Persistor } from 'redux-persist/es/types';
import rehydrationComplete from '../actions/init';
import { GlobalState } from '../reducers';

export function persistStore(store: Store<GlobalState>): any {
  return persistStoreRedux(store, undefined, () => store.dispatch(rehydrationComplete()));
}
