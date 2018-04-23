import { DefaultLinkModel } from "storm-react-diagrams";

export class CogliteLinkModel extends DefaultLinkModel {
  constructor() {
    super("coglite")
    super.setColor("rgba(0,0,0,0.75)")
    super.setWidth(2)
  }
}
