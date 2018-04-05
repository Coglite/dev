import * as React from 'react';
import { Icon, Segment } from 'semantic-ui-react';

export class Footer extends React.Component {
  render() {
    return (
      <Segment basic={true} textAlign="right" attached="bottom" style={{bottom: 0}}>
        <a href="https://github.com/coglite" target="_blank"><Icon name="github" size="big" /></a>
        <a href="https://twitter.com/coglite" target="_blank"><Icon name="twitter" size="big" /></a>
        <a href="http://coglite.com/" target="_blank"><Icon name="home" size="big" /></a>
      </Segment>
    );
  }
}

