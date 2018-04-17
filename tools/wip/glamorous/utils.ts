import { Breakpoints } from "material-ui/styles/createBreakpoints"

export const getColumnWidth = (
  columnCount: number,
  rowWidth: number,
  size: number,
  fixed: boolean = false,
) => (fixed ? size / columnCount * rowWidth : `${size / columnCount * 100}%`)

export const breakpoint = (width: number, mobileFirst = true) => (content: Object) => ({
  [`@media only screen and (${mobileFirst ? "min" : "max"}-width: ${width}px)`]: {
    ...content,
  },
})

export const getBreakpoints = (breakpoints: Breakpoints, sizes: Breakpoints, fn: (number) => {}) =>
  Object.keys(sizes).reduce(
    (acc, size) => Object.assign({}, acc, breakpoint(breakpoints[size])(fn(sizes[size]))),
    {},
  )

type GridConfig = {
  rowWidth: number
  gutterWidth: number
  columnCount: number
  breakpoints: {
    [string]: number
  }
}

export const configGrid = (config: GridConfig) => ({
  getBreakpoints: (sizes, callback) => getBreakpoints(config.breakpoints, sizes, callback),
  getColumnWidth: size => getColumnWidth(config.columnCount, config.rowWidth, size),
  config,
})
