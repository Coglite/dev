import * as React from "react"
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List"
import InboxIcon from "material-ui-icons/MoveToInbox"
import DraftsIcon from "material-ui-icons/Drafts"
import StarIcon from "material-ui-icons/Star"
import SendIcon from "material-ui-icons/Send"
import MailIcon from "material-ui-icons/Mail"
import DeleteIcon from "material-ui-icons/Delete"
import ReportIcon from "material-ui-icons/Report"
import Grid from "material-ui/Grid"
import * as classNames from "classnames"
import Drawer from "material-ui/Drawer"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import List from "material-ui/List"
import Divider from "material-ui/Divider"
import IconButton from "material-ui/IconButton"
import MenuIcon from "material-ui-icons/Menu"
import ArrowBackIcon from "material-ui-icons/ArrowBack"
import ArrowForwardIcon from "material-ui-icons/ArrowForward"
import Close from "material-ui-icons/Close"
import AccountCircle from "material-ui-icons/AccountCircle"
import FormatAlignRight from "material-ui-icons/FormatAlignRight"
import Input from "material-ui-icons/Input"
import LabelOutline from "material-ui-icons/LabelOutline"
import BorderRight from "material-ui-icons/BorderRight"
import Menu, { MenuItem } from "material-ui/Menu"
import Tabs, { Tab } from "material-ui/Tabs"
import * as _ from "lodash"
import { cogWrap, IStyledProps } from "./utils/sharedUtil"
import { ConfirmOptionDialog } from "./utils/ConfirmOptionDialog"

//import {Drawer/} from './utils/DrawerLink'

/* import Image from "material-ui-image" */

const cogliteLogo = require("../assets/coglite-logo-dark-gold-box.png")

import { layoutStyles } from "./layout.styles"
import { TabContainer } from "./TabContainer"

interface IAppFrameState {
  anchorEl: any
  sliderValue: any
  tabValue: number
  themeDialogOpen: boolean
}

export class AppFrame extends React.Component<IStyledProps, IAppFrameState> {
  state: IAppFrameState = {
    anchorEl: null,
    sliderValue: undefined,
    tabValue: 0,
    themeDialogOpen: false,
  }

  toggleMenuDrawer = () => {
    this.props.store.uiStore.updateMenuDrawerState(!this.props.store.uiStore.isMenuDrawerOpen)
  }

  toggleNodeDrawer = () => {
    this.props.store.uiStore.updateNodeDrawerState(!this.props.store.uiStore.isNodeDrawerOpen)
  }

  toggleNodeFormDrawer = () => {
    this.props.store.uiStore.updateNodeFormDrawerState(
      !this.props.store.uiStore.isNodeFormDrawerOpen,
    )
  }

  handleUserAction = (event?: any) => {
    const anchorElement = event ? event.currentTarget : null
    this.setState({ anchorEl: anchorElement })
  }

  handleUserProfile = () => {
    this.props.store.uiStore.updateTheme("velocity")
    this.setState({ anchorEl: null })
  }

  handleUserSettings = event => {
    //no-op
  }

  handleTabChange = (event, tabValue) => {
    this.setState({ tabValue })
  }

  openThemeDialog = () => this.setState({ themeDialogOpen: true })

  handleThemeDialogClose = (selectedOption: string, action: string) => {
    if (action === "ok") {
      const uiStore = this.props.store.uiStore
      uiStore.updateTheme(selectedOption)
    } else {
      //no-op
    }
    this.setState({ themeDialogOpen: false })
  }

  handleAppBarTransition = _.debounce(() => {
    //Broke the 4th Wall Right here ---
    window.dispatchEvent(new Event("resize"))
  }, 100)

  handleDrawerTransition = event => {
    //no-op
  }

  renderDevTool() {
    if (process.env.NODE_ENV !== "production") {
      const DevTools = require("mobx-react-devtools").default
      return <DevTools />
    }
    return null
  }

  render() {
    const { classes } = this.props
    const { isMenuDrawerOpen, isNodeDrawerOpen, isNodeFormDrawerOpen } = this.props.store.uiStore
    const { anchorEl, tabValue } = this.state
    const userActionOpen = Boolean(anchorEl)

    const nodeDrawer = (
      <Drawer
        variant="persistent"
        anchor="right"
        open={isNodeDrawerOpen}
        classes={{
          paper: classes.nodeDrawerPaper,
          paperAnchorRight: classes.nodeDrawerPaperAnchorRight,
        }}
      >
        <div className={classes.nodeDrawerHeader}>
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
                event.dataTransfer.setData(
                  "storm-diagram-node",
                  JSON.stringify({ type: "cogliteIn" }),
                )
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
                event.dataTransfer.setData(
                  "storm-diagram-node",
                  JSON.stringify({ type: "cogliteOut" }),
                )
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

    const nodeFormDrawer = (
      <Drawer
        variant="persistent"
        anchor="right"
        open={isNodeFormDrawerOpen}
        classes={{
          paper: classes.nodeFormDrawerPaper,
          paperAnchorRight: classes.nodeFormDrawerPaperAnchorRight,
        }}
      >
        <div className={classes.nodeFormDrawerHeader}>
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

    return (
      <Grid container className={classes.gridRoot}>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar
              className={classNames(classes.appBar, isMenuDrawerOpen && classes.appBarLeftShift, {
                [classes.appBarRightShift]: isNodeDrawerOpen || isNodeFormDrawerOpen,
              })}
              onTransitionEnd={this.handleAppBarTransition}
            >
              <Toolbar disableGutters={!isMenuDrawerOpen}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.toggleMenuDrawer}
                  className={classNames(classes.menuButton, isMenuDrawerOpen && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Tabs
                  value={tabValue}
                  onChange={this.handleTabChange}
                  centered
                  indicatorColor="secondary"
                  className={classes.flex}
                >
                  <Tab label="Item One" href="#" />
                  <Tab label="Item Two" href="#" />
                  <Tab label="Item Three" href="#" />
                  <Tab label="Item Four" href="#" />
                  <Tab label="Item Five" href="#" />
                </Tabs>
                <div>
                  <IconButton
                    aria-owns={userActionOpen ? "menu-appbar" : null}
                    aria-haspopup="true"
                    onClick={event => this.handleUserAction(event)}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <IconButton
                    aria-owns={userActionOpen ? "menu-appbar" : null}
                    aria-haspopup="true"
                    onClick={() => this.toggleNodeFormDrawer()}
                    color="inherit"
                  >
                    <BorderRight />
                  </IconButton>
                  <IconButton
                    aria-owns={userActionOpen ? "menu-appbar" : null}
                    aria-haspopup="true"
                    onClick={() => this.toggleNodeDrawer()}
                    color="inherit"
                  >
                    <FormatAlignRight />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={userActionOpen}
                    onClose={event => this.handleUserAction()}
                  >
                    <MenuItem onClick={this.handleUserProfile}>Profile</MenuItem>
                    <MenuItem onClick={event => this.openThemeDialog()}>Theme Settings</MenuItem>
                  </Menu>
                </div>
              </Toolbar>
            </AppBar>

            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  !isMenuDrawerOpen && classes.drawerPaperClose,
                ),
              }}
              open={isMenuDrawerOpen}
              onTransitionEnd={this.handleDrawerTransition}
            >
              <div className={classes.drawerInner}>
                <div className={classes.drawerHeader}>
                  <img src={cogliteLogo} style={{ padding: 0 }} className={classes.headerLogo} />
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
            <main
              className={classNames(classes.content, {
                [classes.contentRightShift]: isNodeDrawerOpen || isNodeFormDrawerOpen,
              })}
            >
              <TabContainer tabValue={tabValue} classRules={classes}>
                {this.props.children}
              </TabContainer>
            </main>
            {nodeFormDrawer}
            {nodeDrawer}
          </div>
          <ConfirmOptionDialog
            classes={{ paper: classes.dialog }}
            open={this.state.themeDialogOpen}
            onOptionDialogClose={this.handleThemeDialogClose}
            selectedOption={this.props.store.uiStore.themeId}
            options={["myriad", "velocity", "ranger"]}
            dialogOptions={{ dialogTitle: "Choose Theme", cancelText: "Cancel", okText: "Update" }}
          />
        </div>
      </Grid>
    )
  }
}

export default cogWrap(AppFrame, layoutStyles, true)

//export default inject("store")(injectSheet(styles)(observer(AppFrame)))
