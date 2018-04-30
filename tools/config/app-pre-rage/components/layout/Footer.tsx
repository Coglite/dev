import * as React from "react"
import Typography from "material-ui/Typography"
//import { Paper } from "material-ui"

const version = "0.0.1"

const copyrightString = "© Copyright Coglite 2018"

const footerStyle: React.CSSProperties = {
  height: "25px",
  display: "inline-flex",
  flexDirection: "column",
  width: "100%",
  bottom: "0",
  position: "absolute",
  alignItems: "center",
}

const footerCopyRightStyle: React.CSSProperties = { position: "absolute", left: "10px" }
const footerVersionStyle: React.CSSProperties = { position: "absolute", right: "10px" }

const _Footer = props => (
  <div style={footerStyle}>
    <Typography variant="caption">
      <span style={footerCopyRightStyle}>{copyrightString}</span>
      <span style={footerVersionStyle}>{`Version: ${version || "pre-release"}`}</span>
    </Typography>
  </div>
)

export const Footer = _Footer
