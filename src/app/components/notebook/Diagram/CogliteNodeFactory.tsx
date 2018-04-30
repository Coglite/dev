import * as React from "react"
import * as SRD from "storm-react-diagrams"
import { CogliteNodeModel } from "./CogliteNodeModel"
import CogliteNodeWidget from "./CogliteNodeWidget"

export class CogliteNodeFactory extends SRD.AbstractNodeFactory<CogliteNodeModel> {
  constructor() {
    super("coglite")
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: CogliteNodeModel): JSX.Element {
    return <CogliteNodeWidget node={node} />
  }

  getNewInstance(initialConfig?: any) {
    return new CogliteNodeModel()
  }
}
