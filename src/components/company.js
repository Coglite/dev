import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const StyledCompany = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& img': {
    maxWidth: 50,
    maxHeight: 30,
  }
});

const Company = ({ name, avatar }) => (
  <StyledCompany>
    <div>{name}</div>
    { avatar.src ? <img src={avatar.src} alt="logo" /> : null }
    { avatar.url ? <img src={avatar.url} alt="logo" /> : null }
  </StyledCompany>
);

Company.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.shape({
    src: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default Company;
