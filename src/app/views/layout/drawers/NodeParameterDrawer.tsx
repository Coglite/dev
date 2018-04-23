import withStyles, { StyleRulesCallback } from "material-ui/styles/withStyles"
import { Drawer, IconButton, List, Divider } from "material-ui"
import Close from "@material-ui/icons/Close"
import * as React from "react"

const nodeFormDrawerWidth = 150
const nodeDrawerWidth = 180

//@ts-ignore
const styles: StyleRulesCallback = theme => ({
  nodeFormDrawerPaper: {
    position: "relative",
    width: nodeFormDrawerWidth,
  },
  nodeFormDrawerPaperAnchorRight: {
    left: "auto",
    right: props => {
      if (!props.isNodeDrawerOpen && props.isNodeFormDrawerOpen) {
        return -nodeDrawerWidth
      } else {
        return 0
      }
    },
  },
  nodeFormDrawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
})

type NodeParameterDrawerProps = {
  classes?: any
  isNodeFormDrawerOpen: boolean
  nodeDrawerWidth: string | number
}

const _NodeParameterDrawer = (props: NodeParameterDrawerProps) => (
  <Drawer
    variant="persistent"
    anchor="right"
    open={props.isNodeFormDrawerOpen}
    classes={{
      paper: props.classes.nodeFormDrawerPaper,
      paperAnchorRight: props.classes.nodeFormDrawerPaperAnchorRight,
    }}
  >
    <div className={props.classes.nodeFormDrawerHeader}>
      <IconButton onClick={this.toggleNodeFormDrawer}>
        <Close />
      </IconButton>
    </div>
    <Divider />
    <List>
      <div>Jsonforms-mobx goes here</div>
    </List>
  </Drawer>
)

export const NodeParameterDrawer = withStyles(styles, { withTheme: true })(_NodeParameterDrawer)
