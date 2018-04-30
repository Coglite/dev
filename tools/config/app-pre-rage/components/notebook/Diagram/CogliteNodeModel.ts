import * as _ from "lodash"
import { DiagramEngine, NodeModel } from "storm-react-diagrams"
import { CoglitePortModel } from "./CoglitePortModel"

export class CogliteNodeModel extends NodeModel {
  //Possibe options, cogliteIn & cogliteOut
  cogType: string
  name: string
  color: string
  constructor(
    cogType: string = "cogliteIn",
    name: string = "Untitled",
    color: string = "rgb(0,192,255)",
  ) {
    super("coglite")
    this.cogType = cogType
    this.name = name
    this.color = color
    this.addPort(new CoglitePortModel("leftTop"))
    this.addPort(new CoglitePortModel("leftBottom"))
    this.addPort(new CoglitePortModel("rightTop"))
    this.addPort(new CoglitePortModel("rightBottom"))
  }

  deSerialize(object, engine: DiagramEngine) {
    super.deSerialize(object, engine)
    this.cogType = object.cogType
    this.name = object.name
    this.color = object.color
  }

  serialize() {
    return _.merge(super.serialize(), {
      cogType: this.cogType,
      name: this.name,
      color: this.color,
    })
  }
}
