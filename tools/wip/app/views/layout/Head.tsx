import * as React from "react"

import { AppBar, IconButton, Toolbar, Menu, MenuItem, Tabs, Tab } from "material-ui"
import { withStyles } from "material-ui/styles"
import MenuIcon from "@material-ui/icons/Menu"
import AccountCircle from "@material-ui/icons/AccountCircle"
import FormatAlignRight from "@material-ui/icons/FormatAlignRight"
import BorderRight from "@material-ui/icons/BorderRight"
import * as classNames from "classnames"

interface HeaderProps {
  classes?: any
  tabValue?: any
  userActionOpen: any
  anchorEl: any
  isMenuDrawerOpen: any
}

export const _Header = (props: HeaderProps) => (
  <AppBar
    className={classNames(props.classes.appBar, isMenuDrawerOpen && props.classes.appBarLeftShift, {
      [props.classes.appBarRightShift]: isNodeDrawerOpen || isNodeFormDrawerOpen,
    })}
    onTransitionEnd={this.handleAppBarTransition}
  >
    <Toolbar disableGutters={!isMenuDrawerOpen}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={this.toggleMenuDrawer}
        className={classNames(props.classes.menuButton, isMenuDrawerOpen && props.classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Tabs
        value={props.tabValue}
        onChange={this.handleTabChange}
        centered
        indicatorColor="secondary"
        className={props.classes.flex}
      >
        <Tab label="Item One" href="#" />
        <Tab label="Item Two" href="#" />
        <Tab label="Item Three" href="#" />
        <Tab label="Item Four" href="#" />
        <Tab label="Item Five" href="#" />
      </Tabs>
      <div>
        <IconButton
          aria-owns={props.userActionOpen ? "menu-appbar" : null}
          aria-haspopup="true"
          onClick={event => this.handleUserAction(event)}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <IconButton
          aria-owns={props.userActionOpen ? "menu-appbar" : null}
          aria-haspopup="true"
          onClick={() => this.toggleNodeFormDrawer()}
          color="inherit"
        >
          <BorderRight />
        </IconButton>
        <IconButton
          aria-owns={props.userActionOpen ? "menu-appbar" : null}
          aria-haspopup="true"
          onClick={() => this.toggleNodeDrawer()}
          color="inherit"
        >
          <FormatAlignRight />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={props.anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={props.userActionOpen}
          onClose={event => this.handleUserAction()}
        >
          <MenuItem onClick={this.handleUserProfile}>Profile</MenuItem>
          <MenuItem onClick={event => this.openThemeDialog()}>Theme Settings</MenuItem>
        </Menu>
      </div>
    </Toolbar>
  </AppBar>
)

export let Header = withStyles({}, { withTheme: true })(_Header)
