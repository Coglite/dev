import * as _ from "lodash"
import { LinkModel, DiagramEngine, PortModel, DefaultLinkModel } from "storm-react-diagrams"
import { CogliteLinkModel } from "./CogliteLinkModel"

export class CoglitePortModel extends PortModel {
  position: string | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"
  label: string

  constructor(pos: string = "leftTop") {
    super(pos, "coglite")
    this.position = pos
  }

  serialize() {
    return _.merge(super.serialize(), {
      position: this.position,
    })
  }

  link(port: PortModel): LinkModel {
    let link = this.createLinkModel()
    link.setSourcePort(this)
    link.setTargetPort(port)
    return link
  }

  deSerialize(data: any, engine: DiagramEngine) {
    super.deSerialize(data, engine)
    this.position = data.position
  }

  createLinkModel(): LinkModel {
    let link = super.createLinkModel()
    return link || new CogliteLinkModel()
  }
}
