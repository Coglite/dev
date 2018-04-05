import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, List, Segment } from 'semantic-ui-react';

import { RouterStore } from '../../stores/RouterStore';

interface Iprops {
  router: RouterStore;
}

@inject('router')
@observer

class Top extends React.Component {
  render() {
    const {router} = this.props as Iprops;
    return (
      <Segment basic={true}>
        <Header as="h1" icon={true} textAlign="center">
          <Header.Content>
            Coglite
          </Header.Content>
          <Header.Subheader>
            Start New Project
          </Header.Subheader>
        </Header>
        <Header as="h2" dividing={true}>Introduction</Header>
      </Segment>
    );
  }
}

export default Top;
