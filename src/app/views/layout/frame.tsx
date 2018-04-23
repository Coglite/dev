import * as React from "react"

import { StyleRulesCallback } from "material-ui/styles/withStyles"
import Grid from "material-ui/Grid"
import * as classNames from "classnames"

import * as _ from "lodash"
import { cogWrap, IStyledProps, ConfirmOptionDialog } from "../utils"
import { NodeParameterDrawer } from "./drawers/NodeParameterDrawer"
import { NodeDrawer } from "./drawers/NodeDrawer"
import { LeftAppDrawer } from "./drawers/LeftAppDrawer"

import { TabContainer } from "../atoms"

/* import Image from "material-ui-image" */

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

  flex: {
    flex: 1,
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
})

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

    return (
      <Grid container className={classes.gridRoot}>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            {LeftAppDrawer}
            <main
              className={classNames(classes.content, {
                [classes.contentRightShift]: isNodeDrawerOpen || isNodeFormDrawerOpen,
              })}
            >
              <TabContainer tabValue={tabValue} classRules={classes}>
                {this.props.children}
              </TabContainer>
            </main>
            {NodeParameterDrawer}
            {NodeDrawer}
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

export default cogWrap(AppFrame, styles, true)

//export default inject("store")(injectSheet(styles)(observer(AppFrame)))
