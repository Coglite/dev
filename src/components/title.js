import React from 'react';
import glamorous from 'glamorous';
import { Classes } from '@blueprintjs/core';

const StyledTitle = glamorous.div({
  display: 'flex',
  alignItems: 'center',
});

export default () => (
  <StyledTitle>
    <div className={Classes.NAVBAR_HEADING}>mission impossible</div>
  </StyledTitle>
);
