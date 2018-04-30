const appMenuDrawerWidth = 240
const nodeDrawerWidth = 180
const nodeFormDrawerWidth = 150

export const layoutStyles = theme => ({
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
  drawerInner: { width: appMenuDrawerWidth },

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
})
