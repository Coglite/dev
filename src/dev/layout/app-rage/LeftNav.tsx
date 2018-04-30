import * as React from "react"
import {
  AccountBalanceWallet,
  Cloud,
  Dashboard,
  HelpOutline,
  Settings,
  SwapHoriz,
} from "@material-ui/icons"

import { DrawerLink } from "./DrawerLink"

export const LeftNav = props => (
  <div className="w3-sidenav">
    <DrawerLink route="/" icon={<Dashboard />} />
    <DrawerLink route="/pages/notebook" icon={<SwapHoriz />} />
    <DrawerLink route="/pages/datasets" icon={<AccountBalanceWallet />} />
    <DrawerLink route="/pages/cloud" icon={<Cloud />} />
    <DrawerLink route="/pages/settings" icon={<Settings />} />
    <DrawerLink route="/pages/about" icon={<HelpOutline />} />
  </div>
)

// add "label" if you want to use text ie: <DrawerLink label="Portfolio" route="/" icon={<Dashboard />} />
