import * as React from "react"
import Drawer from "material-ui/Drawer"
import List from "material-ui/List"
import Divider from "material-ui/Divider"
import IconButton from "material-ui/IconButton"
import ArrowForwardIcon from "material-ui-icons/ArrowForward"

import { observer, inject } from "mobx-react"
import { UiStore } from "../../../stores/UiStore"

import { layoutStyles } from "../layout.styles"
import injectStylesheet from 'react-jss'

@inject("store")
@observer
class _NodeDrawer extends React.Component<any, any> {
  render() {
    const { classes } = this.props
    const { nodeDrawerToggle } = this.props.store.uiStore as UiStore
    const nodeDrawer = (
      <Drawer
        variant="persistent"
        anchor="right"
        open={nodeDrawerToggle.open ? true : false}
        classes={{
          paper: classes.nodeDrawerPaper,
          paperAnchorRight: classes.nodeDrawerPaperAnchorRight,
        }}
      >
        <div className={classes.nodeDrawerHeader}>
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

export let NodeDrawer = injectStylesheet(layoutStyles, { withTheme: true })(_NodeDrawer)
