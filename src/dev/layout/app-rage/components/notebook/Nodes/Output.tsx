import * as React from "react"
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List"
import LabelOutline from "material-ui-icons/LabelOutline"
import { observer } from "mobx-react"

@observer
export class OutputNode extends React.Component<any, any> {
  render() {
    const outputNode = (
      <ListItem
        component="div"
        draggable={true}
        onDragStart={event => {
          event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteOut" }))
        }}
      >
        <ListItemIcon>
          <LabelOutline />
        </ListItemIcon>
        <ListItemText primary="Output" />
      </ListItem>
    )
    return outputNode
  }
}
