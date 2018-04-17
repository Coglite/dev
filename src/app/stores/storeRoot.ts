import { RouterStore } from "mobx-react-router"
import { UiStore } from "./uiStore"

class StoreRoot {
  public routing = new RouterStore()
  public uiStore = new UiStore()
}

export { StoreRoot }
