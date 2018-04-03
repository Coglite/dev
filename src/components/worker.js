import React from 'react';
import PropTypes from 'prop-types';
import { head } from 'ramda';
import glamorous from 'glamorous';

const Wrapper = glamorous.span({
  padding: '0 2px',
});

const Worker = ({ firstName, lastName, isShort }) => (
  <Wrapper>{isShort ? `${head(firstName)}${head(lastName)}` : `${firstName} ${lastName}`}</Wrapper>
);

Worker.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  isShort: PropTypes.bool,
};

export default Worker;
