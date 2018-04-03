import React from 'react';

export default (id) => (Component) => {
  class Logger extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
      console.log('render:', id); // eslint-disable-line no-console
      return <Component {...this.props} />
    }
  }

  return Logger;
};
