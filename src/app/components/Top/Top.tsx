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
    const {
      router,
    } = this.props as Iprops;

    return (
      <Segment basic={true}>
        <Header as="h1" icon={true} textAlign="center">
          <Header.Content>
            Utility
          </Header.Content>
          <Header.Subheader>
            utility.kkeisuke.com
          </Header.Subheader>
        </Header>
        <Header as="h2" dividing={true}>Introduction</Header>
        <Segment basic={true}>
          utility tools by <a href="http://kkeisuke.com" target="_blank">kkeisuke.com</a>
        </Segment>
        <Header as="h2" dividing={true}>Contents</Header>
        <Segment basic={true}>
          <List divided={true} size="large" relaxed="very">
            <List.Item>
              <List.Icon name="code" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>
                  <Link to={router.route.sqlFormatter.path}>SQL format</Link>
                </List.Header>
                <List.Description>
                  pretty-printing SQL queries. <a href="https://github.com/zeroturnaround/sql-formatter" target="_blank">zeroturnaround/sql-formatter <Icon name="external" size="small" /></a>.
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="code" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>
                  <Link to={router.route.jsonFormatter.path}>JSON format</Link>
                </List.Header>
                <List.Description>
                  pretty-printing JSON. <a href="https://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript" target="_blank">stackoverflow.com <Icon name="external" size="small" /></a>
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="qrcode" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>
                  <Link to={router.route.qrcode.path}>QRCode</Link>
                </List.Header>
                <List.Description>
                  qr code generator. <a href="https://github.com/soldair/node-qrcode" target="_blank">soldair/node-qrcode <Icon name="external" size="small" /></a>
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
        <Header as="h2">Others</Header>
        <Segment basic={true}>
          <List divided={true} size="large">
            <List.Item>
              <List.Icon name="code" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>
                  <a href="https://plantuml-editor.kkeisuke.com/" target="_blank">
                    PlantUML Editor <Icon name="external" />
                  </a>
                </List.Header>
                <List.Description>
                  PlantUML online demo client
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
        <Header as="h2" dividing={true}>GitHub</Header>
        <Segment basic={true}>
          <List size="large">
            <List.Item>
              <List.Icon name="github" size="large" />
              <List.Content verticalAlign="middle">
                <a href="https://github.com/kkeisuke/utility" target="_blank">https://github.com/kkeisuke/utility <Icon name="external" size="small" /></a>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </Segment>
    );
  }
}

export default Top;
