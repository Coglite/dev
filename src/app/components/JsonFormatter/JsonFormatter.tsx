import './JsonFormatter.css';

import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Form, FormProps, Header, Icon, Segment } from 'semantic-ui-react';

import { JsonCodeMirrorStore } from '../../stores/JsonCodeMirrorStore';
import { JsonFormatterStore } from '../../stores/JsonFormatterStore';

interface Iprops {
  jsonFormatter: JsonFormatterStore;
  jsonCodeMirror: JsonCodeMirrorStore;
}

@inject('jsonFormatter')
@inject('jsonCodeMirror')
@observer
class JsonFormatter extends React.Component<Iprops> {

  indentChange = (e: React.ChangeEvent<HTMLSelectElement>, props: FormProps) => {
    this.props.jsonFormatter.setIndent(e, props);
    this.props.jsonCodeMirror.setIndent(e, props);
  }

  render() {
    const {
      jsonFormatter,
      jsonCodeMirror,
    } = this.props as Iprops;

    return (
      <Segment basic={true}>
        <Header as="h1" dividing={true}>
          <Icon name="code" />JSON format
        </Header>
        <Form>
          <Form.Group widths="equal">
            <Form.TextArea label="JSON" value={jsonFormatter.text} placeholder="paste unformatted JSON" onChange={jsonFormatter.format} autoHeight={true} />
          </Form.Group>
          <Form.Group>
            <Form.Select label="indent" options={jsonFormatter.indents} value={jsonFormatter.indent} onChange={this.indentChange} />
          </Form.Group>
        </Form>
        <CodeMirror value={jsonFormatter.json} onBeforeChange={jsonFormatter.changeJson} options={jsonCodeMirror.options} />
      </Segment>
    );
  }
}

export default JsonFormatter;
