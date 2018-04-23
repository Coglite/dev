import * as React from "react"

export const CssClassWrapper = ({ children, className }) => (
  <span {...{ className }}>{children}</span>
)
