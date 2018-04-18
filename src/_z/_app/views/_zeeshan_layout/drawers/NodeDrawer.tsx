import withStyles, { StyleRulesCallback } from "material-ui/styles/withStyles"
import {
  Drawer,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  Input,
  ListItemText,
} from "material-ui"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import LabelOutline from "@material-ui/icons/LabelOutline"

import * as React from "react"

type NodeDrawerProps = {
  classes?: any
  isNodeDrawerOpen: boolean
  nodeDrawerWidth: number
}

//@ts-ignore
const styles: StyleRulesCallback = theme => ({
  nodeDrawerPaper: {
    position: "relative",
    width: props => props.nodeDrawerWidth,
  },
  nodeDrawerPaperAnchorRight: {
    left: "auto",
    right: 0,
  },
  nodeDrawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
})

const _NodeDrawer = (props: NodeDrawerProps) => (
  <Drawer
    variant="persistent"
    anchor="right"
    open={props.isNodeDrawerOpen}
    classes={{
      paper: props.classes.nodeDrawerPaper,
      paperAnchorRight: props.classes.nodeDrawerPaperAnchorRight,
    }}
  >
    <div className={props.classes.nodeDrawerHeader}>
      <IconButton onClick={this.toggleNodeDrawer}>
        <ArrowForwardIcon />
      </IconButton>
    </div>
    <Divider />
    <List>
      <div>
        <ListItem
          component="div"
          draggable={true}
          onDragStart={event => {
            event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteIn" }))
          }}
        >
          <ListItemIcon>
            <Input />
          </ListItemIcon>
          <ListItemText primary="Input" />
        </ListItem>
        <ListItem
          component="div"
          draggable={true}
          onDragStart={event => {
            event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteOut" }))
          }}
        >
          <ListItemIcon>
            <LabelOutline />
          </ListItemIcon>
          <ListItemText primary="Output" />
        </ListItem>
      </div>
    </List>
  </Drawer>
)

export const NodeDrawer = withStyles(styles, { withTheme: true })(_NodeDrawer)
