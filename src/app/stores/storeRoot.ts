import { RouterStore } from "mobx-react-router"
import { AppViewStore } from "./AppViewStore"

class StoreRoot {
  public routing = new RouterStore()
  public appViewStore = new AppViewStore()
}

export { StoreRoot }
