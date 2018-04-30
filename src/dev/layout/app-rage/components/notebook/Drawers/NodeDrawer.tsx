import * as React from "react"
import Drawer from "material-ui/Drawer"
import List from "material-ui/List"
import Divider from "material-ui/Divider"
import IconButton from "material-ui/IconButton"
import ArrowForwardIcon from "material-ui-icons/ArrowForward"

import { observer, inject } from "mobx-react"
import { UiStore } from "../../../stores/UiStore"

@inject("store")
@observer
export class NodeDrawer extends React.Component<any, any> {
  render() {
    const { nodeDrawerToggle } = this.props.store.uiStore as UiStore
    const nodeDrawer = (
      <Drawer variant="persistent" anchor="right" open={nodeDrawerToggle.open ? true : false}>
        <div>
          <IconButton onClick={() => nodeDrawerToggle.openDrawer(false)}>
            <ArrowForwardIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>{this.props.children}</div>
        </List>
      </Drawer>
    )
    return nodeDrawer
  }
}
