import * as React from 'react';
import { Icon, Segment } from 'semantic-ui-react';

class Footer extends React.Component {
  render() {
    return (
      <Segment basic={true} textAlign="right">
        <a href="https://github.com/kkeisuke/utility" target="_blank"><Icon name="github" size="big" /></a>
        <a href="https://twitter.com/kkeisuke" target="_blank"><Icon name="twitter" size="big" /></a>
        <a href="http://kkeisuke.com/" target="_blank"><Icon name="home" size="big" /></a>
      </Segment>
    );
  }
}

export default Footer;
