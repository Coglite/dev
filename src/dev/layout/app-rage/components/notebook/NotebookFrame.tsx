import * as React from "react"
import { UiStore } from "../../stores/UiStore"

import { ConfirmOptionDialog } from "./ConfirmDialog"

import { observer, inject } from "mobx-react"

import { observable, action } from "mobx"

import { NodeDrawer } from "./Drawers/NodeDrawer"
import { NotebookAppBar } from "./NotebookAppBar"
import { NotebookNavDawer } from "./NotebookNavDrawer"

import { InputNode } from "./Nodes/Input"
import { OutputNode } from "./Nodes/Output"

@inject("store")
@observer
export class NotebookFrame extends React.Component<any, any> {
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
    const {
      //nodeDrawerToggle,
      //nodeFormDrawerToggle,
      themeDialogToggle,
    } = this.props.store.uiStore as UiStore

    const nodeDrawer = (
      <NodeDrawer>
        <InputNode />
        <OutputNode />
      </NodeDrawer>
    )

    return (
      <div>
        <div>
          <NotebookAppBar />

          <NotebookNavDawer />

          <main>{this.props.children}</main>

          {nodeDrawer}
        </div>

        <ConfirmOptionDialog
          open={themeDialogToggle.open}
          onOptionDialogClose={this.handleThemeDialogClose}
          selectedOption={this.props.store.uiStore.themeId}
          options={["myriad", "velocity", "ranger"]}
          dialogOptions={{ dialogTitle: "Choose Theme", cancelText: "Cancel", okText: "Update" }}
        />
      </div>
    )
  }
}
