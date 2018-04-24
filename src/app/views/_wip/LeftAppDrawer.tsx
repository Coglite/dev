import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import DeleteIcon from "@material-ui/icons/Delete"
import DraftsIcon from "@material-ui/icons/Drafts"
import MailIcon from "@material-ui/icons/Mail"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import ReportIcon from "@material-ui/icons/Report"
import SendIcon from "@material-ui/icons/Send"
import StarIcon from "@material-ui/icons/Star"
import * as classNames from "classnames"
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "material-ui"
import withStyles from "material-ui/styles/withStyles"
import * as React from "react"

import { cogWrap, IStyledProps } from "./utils/sharedUtil"

const cogliteLogo = require("../assets/coglite-logo-dark-gold-box.png")

import { layoutStyles } from "./layout.styles"

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

export const LeftAppDrawer = cogWrap(layoutStyles, { withTheme: true })(_LeftAppDrawer)
