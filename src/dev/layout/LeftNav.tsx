import * as React from "react"
import {
  AccountBalanceWallet,
  Cloud,
  Dashboard,
  HelpOutline,
  Settings,
  SwapHoriz,
} from "@material-ui/icons"
import { NavLink, withRouter } from "react-router-dom"
import { DrawerItem } from "./DrawerItem"
import { DashboardPage } from "../pages"

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

export function LeftNav(props, children) {
  ;<div style={leftNavStyles} />
}

// add "label" if you want to use text ie: <DrawerItem label="Portfolio" route="/" icon={<Dashboard />} />
