import { palette } from "./../views/theme/palette"
import { createMuiTheme as Mui } from "material-ui/styles"
import * as mobx from "mobx"
import { observable, computed, action } from "mobx"

export class AppViewStore {
  @observable themeId = "myriad"
  @observable isMenuDrawerOpen = false
  @observable isNodeDrawerOpen = false
  @observable isNodeFormDrawerOpen = false
  @observable isThemeDialogOpen = false

  constructor() {
    mobx.autorun(() => console.log(this.report))
  }

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

  @computed
  get rmwcPath() {
    return `assets/theme-${this.themeId}.css`
  }

  report() {
    console.log("Current theme is " + this.themeId)
  }

  @action
  updateTheme(themeId) {
    this.themeId = themeId
  }

  @action
  updateMenuDrawerState(isMenuDrawerOpen) {
    this.isMenuDrawerOpen = isMenuDrawerOpen
  }

  @action
  updateNodeDrawerState(isNodeDrawerOpen) {
    this.isNodeDrawerOpen = isNodeDrawerOpen
  }

  @action
  updateNodeFormDrawerState(isNodeFormDrawerOpen) {
    this.isNodeFormDrawerOpen = isNodeFormDrawerOpen
  }

  @action
  openThemeDialog() {
    this.isThemeDialogOpen = true
  }

  @action
  closeThemeDialog() {
    this.isThemeDialogOpen = false
  }
}


