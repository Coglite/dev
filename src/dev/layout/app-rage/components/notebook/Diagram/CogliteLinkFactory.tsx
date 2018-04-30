import { DefaultLinkFactory } from "storm-react-diagrams"
import { CogliteLinkModel } from "./CogliteLinkModel"

export class CogliteLinkFactory extends DefaultLinkFactory {
  constructor() {
    super()
    this.type = "coglite"
  }

  getNewInstance(initialConfig?: any): CogliteLinkModel {
    return new CogliteLinkModel()
  }
}
