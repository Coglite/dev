import { createBrowserHistory, History } from "history"
import { RouterStore } from "./RouterStore"
import { UiStore } from "./UiStore"

export interface ICogStore {
  routerStore: RouterStore
  uiStore: UiStore
  history: History
}

class CogStore implements ICogStore {
  history = createBrowserHistory()
  routerStore = new RouterStore(this.history)
  uiStore = new UiStore()
}

export const cogStore = new CogStore()
