import * as React from "react"
import { CogliteNodeModel } from "./CogliteNodeModel"
import { PortWidget, BaseWidget, BaseWidgetProps } from "storm-react-diagrams"
import { withStyles, StyledComponentProps, StyleRulesCallback } from "material-ui/styles"
import Card, { CardContent, CardMedia } from "material-ui/Card"
import IconButton from "material-ui/IconButton"
import Typography from "material-ui/Typography"
import Input from "material-ui-icons/Input"
import LabelOutline from "material-ui-icons/LabelOutline"
import Divider from "material-ui/Divider"
import { WithStyles } from "material-ui"

export const styles: StyleRulesCallback<any> = theme => ({
  cardBasic: {
    display: "flex",
    position: "relative",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    minWidth: 180,
  },
  content: {
    flex: "1 0 auto",
    backgroundColor: "white",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: theme.spacing.unit,
    backgroundColor: theme.palette.background.default,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  headerText: {
    paddingRight: 10,
  },
  name: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  leftTop: {
    position: "absolute",
    zIndex: 10,
    left: -5,
    top: `calc(100% / 4 - 1px)`,
  },
  leftBottom: {
    position: "absolute",
    zIndex: 10,
    left: -5,
    bottom: `calc(100% / 4 - 1px)`,
  },
  rightTop: {
    position: "absolute",
    zIndex: 10,
    left: `calc(100% - 5px)`,
    top: `calc(100% / 4 - 1px)`,
  },
  rightBottom: {
    position: "absolute",
    zIndex: 10,
    left: `calc(100% - 5px)`,
    bottom: `calc(100% / 4 - 1px)`,
  },
})

export interface CogliteNodeWidgetProps extends BaseWidgetProps, WithStyles<any> {
  node: CogliteNodeModel
}

export interface CogliteNodeWidgetState {}

//Patch for props resolution
export class CogliteNodeWidget extends BaseWidget<any, CogliteNodeWidgetState> {
  public static defaultProps: CogliteNodeWidgetProps = {
    node: null,
    classes: {},
  }

  constructor(props: CogliteNodeWidgetProps) {
    super("srd-coglite-node", props)
    this.state = {}
  }

  render() {
    const { classes, theme, node } = this.props
    //To be used in props with styles
    node.color = node.color || theme.palette.common.white

    return (
      <div className={classes.cardBasic}>
        <Card className={classes.details}>
          <div>
            <div className={classes.controls}>
              <IconButton aria-label="Previous" className={classes.playIcon}>
                {node.cogType === "cogliteIn" ? <Input /> : <LabelOutline />}
              </IconButton>
              <Typography variant="subheading" className={classes.headerText}>
                {node.cogType === "cogliteIn" ? `Input Node` : `Output Node`}
              </Typography>
            </div>
          </div>
          <Divider />
          <div>
            <CardContent className={classes.content}>
              <Typography component="p" className={classes.name}>
                {node.name}
              </Typography>
            </CardContent>
          </div>
        </Card>
        <div className={classes.leftTop}>
          <PortWidget name="leftTop" node={node} />
        </div>
        <div className={classes.leftBottom}>
          <PortWidget name="leftBottom" node={node} />
        </div>
        <div className={classes.rightTop}>
          <PortWidget name="rightTop" node={node} />
        </div>
        <div className={classes.rightBottom}>
          <PortWidget name="rightBottom" node={node} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(CogliteNodeWidget)
