import * as classNames from "classnames";
import AccountCircle from "material-ui-icons/AccountCircle";
import BorderRight from "material-ui-icons/BorderRight";
import FormatAlignRight from "material-ui-icons/FormatAlignRight";
import MenuIcon from "material-ui-icons/Menu";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Menu, { MenuItem } from "material-ui/Menu";
import Toolbar from "material-ui/Toolbar";
import { action, observable } from "mobx";
import { inject, observer } from "mobx-react";
import * as React from "react";
import injectStylesheet from "react-jss";
import { UiStore } from "../../stores/UiStore";
import { layoutStyles } from "./layout.styles";








@inject("store")
@observer
class _NotebookAppBar extends React.Component<any, any> {
  @observable currentClickTarget

  @action
  setTarget = event => {
    this.currentClickTarget = event.target
  }

  render() {
    const { classes } = this.props
    const {
      menuDrawerToggle,
      nodeDrawerToggle,
      nodeFormDrawerToggle,
      themeDialogToggle,
      appBarSettingsMenuToggle,
    } = this.props.store.uiStore as UiStore
    const notebookAppBar = (
      <AppBar
        className={classNames(classes.appBar, menuDrawerToggle.open && classes.appBarLeftShift, {
          [classes.appBarRightShift]: nodeDrawerToggle.open || nodeFormDrawerToggle.open,
        })}
      >
        <Toolbar disableGutters={!menuDrawerToggle.open}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={e => {
              menuDrawerToggle.openDrawer(true)
            }}
            className={classNames(classes.menuButton, menuDrawerToggle.open && classes.hide)}
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
        </Toolbar>
      </AppBar>
    )
    return notebookAppBar
  }
}

export let NotebookAppBar = injectStylesheet(layoutStyles, { withTheme: true })(_NotebookAppBar)
