import * as React from "react"
import { UiStore } from "../../stores/UiStore"
import Grid from "material-ui/Grid"
import * as classNames from "classnames"

import { ConfirmOptionDialog } from "./ConfirmDialog"

import { layoutStyles } from "./layout.styles"

import { observer, inject } from "mobx-react"

import { withStyles } from "material-ui/styles"
import { observable, action } from "mobx"

import { NodeDrawer } from "./Drawers/NodeDrawer"
import { NotebookAppBar } from "./NotebookAppBar"
import { NotebookNavDawer } from "./NotebookNavDrawer"

import { InputNode } from "./Nodes/Input"
import { OutputNode } from "./Nodes/Output"

@inject("store")
@observer
export class AppFrame extends React.Component<any, any> {
  @observable currentClickTarget

  @action
  setTarget = event => {
    this.currentClickTarget = event.target
  }

  handleThemeDialogClose = (selectedOption: string, action: string): void => {
    const uiStore = this.props.store.uiStore
    if (action === "ok") {
      uiStore.updateTheme(selectedOption)
    }
    uiStore.themeDialogToggle.openDrawer(false)
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
    const { nodeDrawerToggle, nodeFormDrawerToggle, themeDialogToggle } = this.props.store
      .uiStore as UiStore

    const nodeDrawer = (
      <NodeDrawer>
        <InputNode />
        <OutputNode />
      </NodeDrawer>
    )

    return (
      <Grid container className={classes}>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <NotebookAppBar />

            <NotebookNavDawer />

            <main
              className={classNames(classes.content, {
                [classes.contentRightShift]: nodeDrawerToggle.open || nodeFormDrawerToggle.open,
              })}
            >
              {this.props.children}
            </main>

            {nodeDrawer}
          </div>

          <ConfirmOptionDialog
            classes={{ paper: classes.dialog }}
            open={themeDialogToggle.open}
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

export default withStyles(layoutStyles, { withTheme: true })(AppFrame)
