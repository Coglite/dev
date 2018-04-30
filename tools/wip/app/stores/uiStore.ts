import { palette } from "./../views/theme/palette"
import { createMuiTheme as Mui } from "material-ui/styles"
import { observable, computed, action } from "mobx"
//import {BooleanStore} from './values/Boolean'

export class ToggleOpenValue {
  @observable open = false

  @action
  openDrawer = (open: boolean) => {
    this.open = open
  }

  @action
  closeDrawer = () => {
    this.open = false
  }
}

class UiStore {
  @observable title = "Coglite"
  @observable themeId = "myriad"
  @observable menuDrawerToggle = new ToggleOpenValue()
  @observable nodeDrawerToggle = new ToggleOpenValue()
  @observable nodeFormDrawerToggle = new ToggleOpenValue()
  @observable themeDialogToggle = new ToggleOpenValue()

  @observable isThemeDialogOpen = false

  constructor() {}

  @computed
  get muiTheme() {
    return Mui({
      palette: {
        primary: {
          main: palette[this.themeId].primary,
        },
        secondary: {
          main: palette[this.themeId].secondary,
        },
      },
    })
  }

  @action
  updateTheme(themeId) {
    this.themeId = themeId
  }

  @action
  openThemeDialog() {
    this.isThemeDialogOpen = true
  }

  @action
  closeThemeDialog() {
    this.isThemeDialogOpen = false
  }

  @observable uiError: Error
  @action
  onError = (error: Error) => {
    this.uiError = error
  }
}

export { UiStore }
