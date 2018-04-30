import * as React from "react"
import IconButton from "material-ui/IconButton"
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List"
import InboxIcon from "material-ui-icons/MoveToInbox"
import { UiStore } from "../../stores/UiStore"
import Drawer from "material-ui/Drawer"
import List from "material-ui/List"
import Divider from "material-ui/Divider"
import ArrowBackIcon from "material-ui-icons/ArrowBack"
import { observer, inject } from "mobx-react"
import { observable, action } from "mobx"

const cogliteLogo = require("../../assets/coglite-logo-dark-gold-box.png")

const drawerHeader: any = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 8px",
}

const headerLogo: React.CSSProperties = {
  position: "relative",
  padding: 0,
  width: "120px",
  height: "40px",
}

@inject("store")
@observer
export class NotebookNavDawer extends React.Component<any, any> {
  @observable currentClickTarget

  @action
  setTarget = event => {
    this.currentClickTarget = event.target
  }

  render() {
    const { menuDrawerToggle } = this.props.store.uiStore as UiStore
    const notebookNavDawer = (
      <Drawer variant="permanent" open={menuDrawerToggle.open ? true : false}>
        <div style={{ width: 240 }}>
          <div style={drawerHeader}>
            <img src={cogliteLogo} style={headerLogo} />
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
