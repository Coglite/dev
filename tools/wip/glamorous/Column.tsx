// @flow
import React from 'react';
import deepmerge from 'deepmerge';
import glamorous, { withTheme } from 'glamorous';
// import { getBreakpoints, getColumnWidth } from 'utils';

type Props = {
  children: Object,
  theme: Object,
  // zeroflexBasis: boolean,
  // width: number,
  center: ?boolean,
  fixed: boolean,
  // left: ?boolean,
  // right: ?boolean,
  // stretch: ?boolean,
  sizes: Object,
  marginsBottom: Object,
  marginsTop: Object,
  styles: Object,
};

const Column = ({
  children,
  theme,
  center,
  // zeroflexBasis,
  fixed,
  styles,
  // left,
  // right,
  // stretch,
  sizes = {},
  marginsBottom = {},
  marginsTop = {},
}: Props) => {
  const { getBreakpoints, getColumnWidth, config } = theme.flexGrid;

  const breakpoints = getBreakpoints(sizes, size => ({
    maxWidth: getColumnWidth(size, fixed),
    flex: `1 0 ${getColumnWidth(size, fixed)}`,
    // flexBasis: zeroflexBasis ? 'initial' : getColumnWidth(columnCount, rowWidth, size, fixed),
  }));

  const marginsTopBreakpoints = getBreakpoints(marginsTop, margin => ({
    marginTop: margin,
  }));

  const marginsBottomBreakpoints = getBreakpoints(marginsBottom, margin => ({
    marginBottom: margin,
  }));

  const ColumnElement = glamorous.div({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: center ? 'center' : 'auto',
    paddingLeft: config.gutterWidth / 2,
    paddingRight: config.gutterWidth / 2,
    boxSizing: 'border-box',
    // Deep merge breakpoints
    ...deepmerge(breakpoints, marginsTopBreakpoints, marginsBottomBreakpoints),
  });

  return (
    <ColumnElement css={styles}>
      {children}
    </ColumnElement>
  );
};

Column.defaultProps = {
  center: false,
  fixed: false,
  css: {},
  // left: false,
  // right: false,
  // stretch: false,
};

export default withTheme(Column);
