import * as React from "react"
import { withStyles, Paper } from "material-ui"
import {
  AccountBalanceWallet,
  Cloud,
  Dashboard,
  HelpOutline,
  Settings,
  SwapHoriz,
} from "@material-ui/icons"

import { DrawerLink } from "../atoms/DrawerLink"

const leftNavStyles: React.CSSProperties = {
  width: 64,
  height: "100%",
  position: "absolute",
  top: 50,
  bottom: 0,
  left: 0,
  paddingTop: 0,
  display: "flex",
  flexDirection: "column",
  alignmentBaseline: "central",
}

const styles = theme => ({
  leftNav: leftNavStyles,
  leftNavInvert: {
    ...leftNavStyles,
    backgroundColor: theme.palette.secondary[50],
  },
})

type LeftNavProps = {
  classes?: any
  invert?: any
}

const _LeftNav = (P: LeftNavProps) => (
  <React.Fragment>
    <Paper className={P.invert ? P.classes.leftNavInvert : P.classes.leftNav}>
      <DrawerLink route="/" icon={<Dashboard />} />
      <DrawerLink route="/pages/notebook" icon={<SwapHoriz />} />
      <DrawerLink route="/pages/datasets" icon={<AccountBalanceWallet />} />
      <DrawerLink route="/pages/cloud" icon={<Cloud />} />
      <DrawerLink route="/pages/settings" icon={<Settings />} />
      <DrawerLink route="/pages/about" icon={<HelpOutline />} />
    </Paper>
  </React.Fragment>
)

export const LeftNav = withStyles(styles, { withTheme: true })(_LeftNav)

// add "label" if you want to use text ie: <DrawerLink label="Portfolio" route="/" icon={<Dashboard />} />
