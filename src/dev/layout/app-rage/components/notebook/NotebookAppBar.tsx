import * as React from "react"
import { UiStore } from "../../stores/UiStore"
import IconButton from "material-ui/IconButton"
import MenuIcon from "material-ui-icons/Menu"

import AccountCircle from "material-ui-icons/AccountCircle"
import FormatAlignRight from "material-ui-icons/FormatAlignRight"
import BorderRight from "material-ui-icons/BorderRight"
import Menu, { MenuItem } from "material-ui/Menu"

import { observer, inject } from "mobx-react"

import { observable, action } from "mobx"

@inject("store")
@observer
export class NotebookAppBar extends React.Component<any, any> {
  @observable currentClickTarget

  @action
  setTarget = event => {
    this.currentClickTarget = event.target
  }

  render() {
    const {
      menuDrawerToggle,
      nodeDrawerToggle,
      nodeFormDrawerToggle,
      themeDialogToggle,
      appBarSettingsMenuToggle,
    } = this.props.store.uiStore as UiStore

    const notebookAppBar = (
      <div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={e => {
            menuDrawerToggle.openDrawer(true)
          }}
        >
          <MenuIcon />
        </IconButton>

        <div>
          <IconButton
            aria-owns="appbar-account-icon"
            aria-haspopup="true"
            onClick={e => {
              this.setTarget(e)
              appBarSettingsMenuToggle.openDrawer(true)
            }}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

          <IconButton onClick={() => nodeFormDrawerToggle.openDrawer(true)} color="inherit">
            <BorderRight />
          </IconButton>

          <IconButton onClick={() => nodeDrawerToggle.openDrawer(true)} color="inherit">
            <FormatAlignRight />
          </IconButton>

          <Menu
            anchorEl={this.currentClickTarget}
            id="appbar-account-icon"
            aria-label="appbar-account-icon"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={appBarSettingsMenuToggle.open}
            onClose={() => {
              appBarSettingsMenuToggle.openDrawer(false)
            }}
          >
            <MenuItem
              onClick={() => {
                appBarSettingsMenuToggle.openDrawer(false)
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                themeDialogToggle.openDrawer(true), appBarSettingsMenuToggle.openDrawer(false)
              }}
            >
              Theme Settings
            </MenuItem>
          </Menu>
        </div>
      </div>
    )
    return notebookAppBar
  }
}
