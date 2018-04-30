import * as React from "react";


const version = "0.0.1";

const copyrightString = "© Copyright Coglite 2018";

 let footerStyle:  React.CSSProperties = {
  height: "25px",
  display: "inline",
  flexDirection: "column",
  width: "100%",
  bottom: "0",
  position: "fixed",
  alignItems: "center",
};

var footerCopyRightStyle: React.CSSProperties = { position: 'absolute', left: "10px" };
var footerVersionStyle: React.CSSProperties = { position: "absolute", right: "10px" };

export interface p {
  footerStyle
  footerCopyRightStyle
  footerVersionStyle
}

export let Footer = () =>
  <div style={footerStyle}>
      <div style={footerCopyRightStyle}>{`${copyrightString}`}</div>
      <div style={footerVersionStyle}>{`Version: ${version || "pre-release"}`}</div>
  </div>


