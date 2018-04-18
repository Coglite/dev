import withStyles, { StyleRulesCallback } from "material-ui/styles/withStyles"
import {
  Drawer,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "material-ui"
import * as classNames from "classnames"

import * as React from "react"

import InboxIcon from "@material-ui/icons/MoveToInbox"
import DraftsIcon from "@material-ui/icons/Drafts"
import StarIcon from "@material-ui/icons/Star"
import SendIcon from "@material-ui/icons/Send"
import MailIcon from "@material-ui/icons/Mail"
import DeleteIcon from "@material-ui/icons/Delete"
import ReportIcon from "@material-ui/icons/Report"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

const cogliteLogo = require("../assets/coglite-logo-dark-gold-box.png")

//@ts-ignore
const styles: StyleRulesCallback = theme => ({
  drawerPaper: {
    position: "relative",
    height: "100%",
    width: props => props.appMenuDrawerWidth,
    overflow: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflow: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  // Make the items inside not wrap when transitioning:
  drawerInner: {
    width: props => props.appMenuDrawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    boxShadow: theme.shadows["4"],
    ...theme.mixins.toolbar,
  },
  headerLogo: {
    position: "relative",
    padding: 0,
    width: "120px",
    height: "40px",
  },
})

type LeftAppDrawerProps = {
  classes?: any
  isMenuDrawerOpen: boolean
  appMenuDrawerWidth: any
}

const _LeftAppDrawer = (props: LeftAppDrawerProps) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: classNames(
        props.classes.drawerPaper,
        !props.isMenuDrawerOpen && props.classes.drawerPaperClose,
      ),
    }}
    open={props.isMenuDrawerOpen}
    onTransitionEnd={this.handleDrawerTransition}
  >
    <div className={props.classes.drawerInner}>
      <div className={props.classes.drawerHeader}>
        <img src={cogliteLogo} style={{ padding: 0 }} className={props.classes.headerLogo} />
        <IconButton onClick={this.toggleMenuDrawer}>
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
          <ListItem button>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Send mail" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </div>
      </List>
      <Divider />
      <List>
        <div>
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="All mail" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Spam" />
          </ListItem>
        </div>
      </List>
    </div>
  </Drawer>
)

export const LeftAppDrawer = withStyles(styles, { withTheme: true })(_LeftAppDrawer)
