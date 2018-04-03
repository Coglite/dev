import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarGroup, Classes } from "@blueprintjs/core";
import cx from 'classnames';
import glamorous from 'glamorous';

export const HeaderLeft = ({ children }) => <NavbarGroup aligh="left">{children}</NavbarGroup>;
HeaderLeft.propTypes = { children: PropTypes.node };

export const HeaderRight = ({ children }) => <NavbarGroup align="right">{children}</NavbarGroup>;
HeaderRight.propTypes = { children: PropTypes.node };

const StyledHeader = glamorous(Navbar)(
  {},
  ({ isfixed }) => ({ zIndex: isfixed === 'true' ? 10 : 0 })
);

export const Header = ({ isFixed, children }) => {
  const headerLeft = () => React.Children.toArray(children).find((child) => child.type === HeaderLeft);
  const headerRight = () => React.Children.toArray(children).find(({type}) => type === HeaderRight);

  return (
    <StyledHeader
      isfixed={isFixed ? 'true' : 'false'}
      className={cx({[Classes.FIXED_TOP]: isFixed})}
    >
      {headerLeft()}
      {headerRight()}
    </StyledHeader>
  );
};

Header.propTypes = {
  isFixed: PropTypes.bool,
  children: PropTypes.node,
};
