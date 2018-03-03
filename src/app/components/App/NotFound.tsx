import * as React from 'react';
import {
  Header,
  Segment,
} from 'semantic-ui-react';

class NotFound extends React.Component {
  render() {
    return (
      <Segment basic={true}>
        <Header as="h1" dividing={true}>Not Found</Header>
      </Segment>
    );
  }
}

export default NotFound;
