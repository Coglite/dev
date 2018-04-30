import * as React from "react"

import { NotebookFrame } from "./NotebookFrame"
import { CogliteNotebookRoutes } from "./routes"
import { observer } from "mobx-react"

import { vertical, fillParent, content, height, flex, horizontal, width } from "csstips"
import { style } from "typestyle"

import { NotebookAppBar } from "./NotebookAppBar"
//import {NotebookNavDawer} from './NotebookNavDrawer'
import { NodeDrawer } from "./Drawers/NodeDrawer"

import { LeftNav } from "../../LeftNav"
export const xNotebookView = observer(props => {
  return (
    <div id="rootBlock">
      <NotebookFrame>
        <CogliteNotebookRoutes />
      </NotebookFrame>
    </div>
  )
})

export const NotebookView = observer((props: any) => {
  return (
    <div className={style(fillParent, vertical)}>
      <div className={style(content, height(50))}>
        <NotebookAppBar />
      </div>
      <div className={style(flex, horizontal)}>
        <div className={style(content, width(100))}>
          <LeftNav />
        </div>
        <div className={style(flex)}>
          <CogliteNotebookRoutes />
        </div>
        <div className={style(content, width(100))}>
          <NodeDrawer />
        </div>
      </div>
      <div style={{ bottom: 0 }} className={style(content, height(50))}>
        Footer
      </div>
    </div>
  )
})
