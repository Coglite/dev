import * as React from "react"
import * as classNames from "classnames"
import IconButton from "material-ui/IconButton"
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List"
import InboxIcon from "material-ui-icons/MoveToInbox"
import { UiStore } from "../../stores/UiStore"
import Drawer from "material-ui/Drawer"
import List from "material-ui/List"
import Divider from "material-ui/Divider"
import ArrowBackIcon from "material-ui-icons/ArrowBack"
import { layoutStyles } from "./layout.styles"

import { observer, inject } from "mobx-react"
import { withStyles } from "material-ui/styles"
import { observable, action } from "mobx"

const cogliteLogo = require("../../assets/coglite-logo-dark-gold-box.png")

@inject("store")
@observer
class _NotebookNavDawer extends React.Component<any, any> {
  @observable currentClickTarget

  @action
  setTarget = event => {
    this.currentClickTarget = event.target
  }

  render() {
    const { classes } = this.props
    const { menuDrawerToggle } = this.props.store.uiStore as UiStore
    const notebookNavDawer = (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !menuDrawerToggle.open && classes.drawerPaperClose,
          ),
        }}
        open={menuDrawerToggle.open ? true : false}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <img src={cogliteLogo} style={{ padding: 0 }} className={classes.headerLogo} />
            <IconButton onClick={() => menuDrawerToggle.openDrawer(false)}>
              <ArrowBackIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <div>
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItem>
            </div>
          </List>
        </div>
      </Drawer>
    )
    return notebookNavDawer
  }
}

export let NotebookNavDawer = withStyles(layoutStyles, { withTheme: true })(_NotebookNavDawer)
