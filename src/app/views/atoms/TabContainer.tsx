import * as React from "react"
import { withStyles, StyleRulesCallback } from "material-ui/styles"

const styles: StyleRulesCallback = theme => ({
  tabContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
})

interface ITabContainerProps {
  children: React.ReactNode
  tabValue: number
  classRules: any
}

const _TabContainer: React.SFC<ITabContainerProps> = props => {
  return <div className={props.classRules.tabContainer}>{props.children}</div>
}

export const TabContainer = withStyles(styles, { withTheme: true })(_TabContainer)
