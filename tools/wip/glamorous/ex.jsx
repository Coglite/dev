import React from 'react';
import { ThemeProvider } from 'glamorous';
import { storiesOf } from '@storybook/react'; //eslint-disable-line
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
// import { Column, Row } from '../src';
import ColumnExample from './ColumnExample';
import flexGrid from '../src';

const columnCount = 12;
const breakpoints = {
  xs: 320,
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
};

const theme = {
  flexGrid: flexGrid({
    rowWidth: 1280,
    gutterWidth: 20,
    columnCount,
    breakpoints,
  }),
};

storiesOf('Grid', module)
  .add('12 column', () => (
    <ThemeProvider theme={theme}>
      <ColumnExample columnCount={6} columnWidth={2} />
    </ThemeProvider>
));
