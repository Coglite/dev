import * as React from "react"
import { withStyles, StyleRulesCallback } from "material-ui/styles"

const styles: StyleRulesCallback<"tabContainer"> = theme => ({
  tabContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
})

const _TabContainer = props => {
  return <div className={props.classes.tabContainer}>{props.children}</div>
}

export const TabContainer = withStyles(styles, { withTheme: true })(_TabContainer)
