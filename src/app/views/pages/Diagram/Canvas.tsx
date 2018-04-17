import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  LinkModel,
  DefaultPortModel,
  DiagramWidget,
  LabelModel,
} from "storm-react-diagrams"
import * as _ from "lodash"
import * as React from "react"

// import the custom models
import { CogliteNodeFactory } from "./CogliteNodeFactory"
import { SimplePortFactory } from "./SimplePortFactory"
import { CogliteNodeModel } from "./CogliteNodeModel"
import { CoglitePortModel } from "./CoglitePortModel"
import { CogliteLinkFactory } from "./CogliteLinkFactory"

export default class Canvas extends React.Component<any, any> {
  protected activeModel: DiagramModel
  protected diagramEngine: DiagramEngine

  constructor(props) {
    super(props)
    this.diagramEngine = new DiagramEngine()
    this.diagramEngine.installDefaultFactories()

    this.initialiseModel()
  }

  initialiseModel() {
    this.diagramEngine.registerLinkFactory(new CogliteLinkFactory())
    this.diagramEngine.registerPortFactory(
      new SimplePortFactory("coglite", config => new CoglitePortModel()),
    )
    this.diagramEngine.registerNodeFactory(new CogliteNodeFactory())

    //2) setup the diagram model
    var model = new DiagramModel()

    //3-A) create a default node
    var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)")
    var port1 = node1.addOutPort("Out")
    node1.setPosition(100, 150)

    //3-B) create our new custom node
    var node2 = new CogliteNodeModel("cogliteIn", "Coglite Transform block")
    node2.setPosition(300, 250)

    var node3 = new DefaultNodeModel("Node 3", "red")
    var port3 = node3.addInPort("In")
    node3.setPosition(550, 150)

    var node4 = new CogliteNodeModel("cogliteOut", "Coglite Transform block")
    node4.setPosition(50, 250)

    //3-C) link the 2 nodes together
    var link1 = port1.link(port3)
    //var link2 = port3.link(node2.getPort("rightBottom"));

    var link3 = (node4.getPort("rightTop") as CoglitePortModel).link(node2.getPort("leftBottom"))

    //4) add the models to the root graph
    model.addAll(node2, node4, link3, node1, node3, link1)

    //5) load model into engine
    this.diagramEngine.setDiagramModel(model)

    //model.addAll(node2, node4, link3, node1, node3, link1)
  }

  componentDidMount() {
    this.forceUpdate()
  }

  render() {
    //6) render the diagram!
    return (
      <div
        className="diagram-layer"
        onDrop={event => {
          var data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"))
          var nodesCount = _.keys(this.diagramEngine.getDiagramModel().getNodes()).length

          var node = null
          if (data.type === "cogliteIn") {
            node = new CogliteNodeModel(
              "cogliteIn",
              "Dragged Input" + (nodesCount + 1),
              "rgb(192,255,0)",
            )
            //node.addInPort("In");
          } else {
            node = new CogliteNodeModel(
              "cogliteOut",
              "Dragged Output" + (nodesCount + 1),
              "rgb(0,192,255)",
            )
            //node.addOutPort("Out");
          }
          var points = this.diagramEngine.getRelativeMousePoint(event)
          node.x = points.x
          node.y = points.y
          this.diagramEngine.getDiagramModel().addNode(node)
          debugger
          this.forceUpdate()
        }}
        onDragOver={event => {
          //event.preventDefault();
        }}
      >
        <DiagramWidget className="srd-coglite-canvas" diagramEngine={this.diagramEngine} />
      </div>
    )
  }
}
