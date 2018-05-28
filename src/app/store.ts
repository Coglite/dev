import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import {DevTools} from './containers/DevTools'

const devEnhancer = compose(applyMiddleware(thunkMiddleware), DevTools.instrument());
const prodEnhancer = applyMiddleware(thunkMiddleware);

export const store = createStore(rootReducer, devEnhancer)
