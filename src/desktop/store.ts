
import { createStore, Action } from 'redux'
import when from 'when-switch'
import { setAppend } from 'monolite'
import { createMainWindow } from './main';


interface State {
  windows: any
}

const initialState: State = {
  windows: []
}

const reducer = (state: State, action: Action) =>
  when(action.type)
    .is('NEW_WINDOW', () => setAppend(state, _ => _.windows)(createMainWindow()))
    .else(state)

export let store = createStore(reducer, initialState)

