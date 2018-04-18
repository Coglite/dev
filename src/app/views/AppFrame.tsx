import * as React from "react"
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List"
import InboxIcon from "material-ui-icons/MoveToInbox"
import DraftsIcon from "material-ui-icons/Drafts"
import StarIcon from "material-ui-icons/Star"
import SendIcon from "material-ui-icons/Send"
import MailIcon from "material-ui-icons/Mail"
import DeleteIcon from "material-ui-icons/Delete"
import ReportIcon from "material-ui-icons/Report"
import { StyleRulesCallback } from "material-ui/styles/withStyles"
import Grid from "material-ui/Grid"
import * as classNames from "classnames"
import Drawer from "material-ui/Drawer"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import List from "material-ui/List"
//import Typography from "material-ui/Typography"
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
//import ChevronRight from "material-ui-icons/ChevronRight"
import BorderRight from "material-ui-icons/BorderRight"
import Menu, { MenuItem } from "material-ui/Menu"
import Tabs, { Tab } from "material-ui/Tabs"
import * as _ from "lodash"
import { cogWrap, IStyledProps } from "./utils/sharedUtil"
import { ConfirmOptionDialog } from "./utils/ConfirmOptionDialog"

/* import Image from "material-ui-image" */

const cogliteLogo = require("../assets/coglite-logo-dark-gold-box.png")

const appMenuDrawerWidth = 240
const nodeDrawerWidth = 180
const nodeFormDrawerWidth = 150

const styles: StyleRulesCallback<"root"> = theme => ({
  gridRoot: {
    flexGrow: 1,
    width: "100vw",
    height: "100vh",
    padding: 0,
    margin: 0,
  },
  root: {
    width: "100%",
    zIndex: 1,
    overflow: "hidden",
  },
  appFrame: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%",
  },
  appBar: {
    position: "absolute",
    /* zIndex: theme.zIndex.drawer + 1, */
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarLeftShift: {
    marginLeft: appMenuDrawerWidth,
    width: `calc(100% - ${appMenuDrawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarRightShift: {
    width: (props: any) => {
      let shiftWidth = 0
      if (props.isMenuDrawerOpen) shiftWidth += appMenuDrawerWidth
      if (props.isNodeDrawerOpen) shiftWidth += nodeDrawerWidth
      if (props.isNodeFormDrawerOpen) shiftWidth += nodeFormDrawerWidth
      return `calc(100% - ${shiftWidth}px)`
    },
    marginRight: (props: any) => {
      let shiftWidth = 0
      if (props.isNodeDrawerOpen) shiftWidth += nodeDrawerWidth
      if (props.isNodeFormDrawerOpen) shiftWidth += nodeFormDrawerWidth
      return shiftWidth
    },
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 60,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawerPaper: {
    position: "relative",
    height: "100%",
    width: appMenuDrawerWidth,
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
    width: appMenuDrawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    boxShadow: theme.shadows["4"],
    ...theme.mixins.toolbar,
  },
  flex: {
    flex: 1,
  },
  headerLogo: {
    position: "relative",
    padding: 0,
    width: "120px",
    height: "40px",
  },

  nodeDrawerPaper: {
    position: "relative",
    width: nodeDrawerWidth,
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
  content: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 2,
    height: "calc(100% - 56px)",
    marginTop: 56,
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px)",
      marginTop: 64,
    },
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -(nodeDrawerWidth + nodeFormDrawerWidth),
  },
  contentRightShift: {
    transition: theme.transitions.create("marginRight", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: (props: any) => {
      let currentMargin
      if (props.isNodeDrawerOpen && props.isNodeFormDrawerOpen) currentMargin = 0
      else if (props.isNodeDrawerOpen) currentMargin = -nodeFormDrawerWidth
      else if (props.isNodeFormDrawerOpen) currentMargin = -nodeDrawerWidth
      return currentMargin
    },
  },
  dialog: {
    width: "80%",
    maxHeight: 435,
  },
  tabContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
})

interface IAppFrameState {
  anchorEl: any
  sliderValue: any
  tabValue: number
  themeDialogOpen: boolean
}

interface ITabContainerProps {
  children: React.ReactNode
  tabValue: number
  classRules: any
}

const TabContainer: React.SFC<ITabContainerProps> = props => {
  return <div className={props.classRules.tabContainer}>{props.children}</div>
}

export class AppFrame extends React.Component<IStyledProps, IAppFrameState> {
  state: IAppFrameState = {
    anchorEl: null,
    sliderValue: undefined,
    tabValue: 0,
    themeDialogOpen: false,
  }

  toggleMenuDrawer = () => {
    this.props.store.appViewStore.updateMenuDrawerState(!this.props.store.appViewStore.isMenuDrawerOpen)
  }

  toggleNodeDrawer = () => {
    this.props.store.appViewStore.updateNodeDrawerState(!this.props.store.appViewStore.isNodeDrawerOpen)
  }

  toggleNodeFormDrawer = () => {
    this.props.store.appViewStore.updateNodeFormDrawerState(
      !this.props.store.appViewStore.isNodeFormDrawerOpen,
    )
  }

  handleUserAction = (event?: any) => {
    const anchorElement = event ? event.currentTarget : null
    this.setState({ anchorEl: anchorElement })
  }

  handleUserProfile = () => {
    this.props.store.appViewStore.updateTheme("velocity")
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
      const appViewStore = this.props.store.appViewStore
      appViewStore.updateTheme(selectedOption)
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
    const { isMenuDrawerOpen, isNodeDrawerOpen, isNodeFormDrawerOpen } = this.props.store.appViewStore
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
            selectedOption={this.props.store.appViewStore.themeId}
            options={["myriad", "velocity", "ranger"]}
            dialogOptions={{ dialogTitle: "Choose Theme", cancelText: "Cancel", okText: "Update" }}
          />
        </div>
      </Grid>
    )
  }
}

export default cogWrap(AppFrame, styles, true)

//export default inject("store")(injectSheet(styles)(observer(AppFrame)))
