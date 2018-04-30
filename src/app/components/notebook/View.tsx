import * as React from "react"

import AppFrame from "./NotebookFrame"
import { CogliteNotebookRoutes } from "./routes"
import { observer } from "mobx-react"

export const NotebookView = observer(props => {
  return (
    <div id="rootBlock">
      <AppFrame>
        <CogliteNotebookRoutes />
      </AppFrame>
    </div>
  )
})
