import './SqlFormatter.css';

import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Form, Header, Icon, Segment } from 'semantic-ui-react';

import { SqlCodeMirrorStore } from '../../stores/SqlCodeMirrorStore';
import { SqlFormatterStore } from '../../stores/SqlFormatterStore';


interface Iprops {
  sqlFormatter: SqlFormatterStore;
  sqlCodeMirror: SqlCodeMirrorStore;
}

@inject('sqlFormatter')
@inject('sqlCodeMirror')
@observer
class SqlFormatter extends React.Component {
  render() {
    const {sqlFormatter,sqlCodeMirror} = this.props as Iprops;
    return (
      <Segment basic={true}>
        <Header as="h1" dividing={true}>
          <Icon name="code" />SQL format
        </Header>
        <Form>
          <Form.Group widths="equal">
            <Form.TextArea label="SQL" value={sqlFormatter.text} placeholder="paste unformatted SQL" onChange={sqlFormatter.format} autoHeight={true} />
          </Form.Group>
          <Form.Group>
            <Form.Select label="mode" options={sqlCodeMirror.modes} value={sqlCodeMirror.options.mode} onChange={sqlCodeMirror.setOptions} />
          </Form.Group>
        </Form>
        <CodeMirror value={sqlFormatter.sql} onBeforeChange={sqlFormatter.changeSql} options={sqlCodeMirror.options} />
      </Segment>
    );
  }
}

export default SqlFormatter;
