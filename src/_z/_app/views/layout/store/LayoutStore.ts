import { observable, computed, action } from "mobx"

class LayoutStore {
  @observable innerRightDrawerOpen: boolean = false
  @observable innerRightDrawerWidth: number = 150

  @observable outerRightDrawerOpen: boolean = false
  @observable innerLeftDrawerOpen: boolean = false

  appMenuDrawerWidth = 240
  nodeDrawerWidth = 180
  nodeFormDrawerWidth = 150
}
//nodeDrawerWidth
