// @flow
import React from 'react';
import { withTheme } from 'glamorous';
import { Row, Column } from '../src';

type Props = {
  columnCount: number,
  columnWidth: number,
  sizes: {
    [string]: number,
  }
};

const ColumnExample = ({ columnCount, columnWidth }: Props) => (
  <Row>
    {(() => {
      const columns = [];
      for (let i = 0; i < columnCount; i += 1) {
        columns.push(
          <Column key={i} sizes={{ m: columnWidth }}><p>{i + 1}</p></Column>,
        );
      }
      return columns;
    })()}
  </Row>
);

export default withTheme(ColumnExample);
