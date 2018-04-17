import * as React from "react"
import { Div, withTheme, CSSProperties } from "glamorous"

type Props = {
  children: React.ReactChildren
  theme: CSSProperties
  center?: boolean
  column?: boolean
  verticalAlign?: boolean
  css: CSSProperties
}

const Row = ({ children, theme, center, column, verticalAlign, css }: Props) => {
  const { config } = theme.flexGrid

  // Base/static stules
  const styles = {
    maxWidth: config.rowWidth,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: center ? "center" : "",
    height: "auto",
    alignItems: verticalAlign ? "center" : "auto",
    width: "100%",
    position: "relative",
    margin: "auto",
  }

  // Conditional / dynaimc styles
  const verticalAlignStyles = {
    height: "100%",
    alignItems: "center",
  }

  const centerStyles = {
    alignItems: verticalAlign ? "center" : "auto",
  }

  const columnStyles = {
    flexDirection: column ? "column" : "auto",
  }

  const conditional = {
    ...(verticalAlign ? verticalAlignStyles : {}),
    ...(center ? centerStyles : {}),
    ...(column ? columnStyles : {}),
  }

  return <Div css={[styles, conditional, css]}>{children}</Div>
}

Row.defaultProps = {
  center: false,
  verticalAlign: false,
  column: false,
  css: {},
}

export default withTheme(Row)
