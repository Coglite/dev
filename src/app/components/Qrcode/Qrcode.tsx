import './Qrcode.css';

import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Button, Divider, Form, Header, Icon, Message, Segment } from 'semantic-ui-react';

import { QrcodeStore } from '../../stores/QrcodeStore';

interface Iprops {
  qrcode: QrcodeStore;
}

@inject('qrcode')
@observer
class Qrcode extends React.Component<Iprops> {

  componentDidMount() {
    const {
      qrcode,
    } = this.props as Iprops;

    qrcode.setFile(document.getElementById('file') as HTMLInputElement);
    qrcode.setCanvas(document.getElementById('canvas') as HTMLCanvasElement);
    qrcode.toCanvas();
    qrcode.addFileReadEventListener();
  }

  clickFile = () => {
    this.props.qrcode.file.click();
  }

  render() {
    const {
      qrcode,
    } = this.props as Iprops;

    return (
      <Segment basic={true}>
        <Header as="h1" dividing={true}>
          <Icon name="qrcode" />QRCode
        </Header>
        <Message warning={true} compact={true} size="small">
          <p>Recommended browsers are Chrome and Safari</p>
        </Message>
        <Form>
          <Form.Group>
            <Form.Input label="text" value={qrcode.text} onChange={qrcode.changeText} width={8} />
          </Form.Group>
          <Form.Group>
            <Form.Input label="width" value={qrcode.width} type="number" min={qrcode.widthMin} max={qrcode.widthMax} onChange={qrcode.changeWidth} width={2} />
            <Form.Input label="margin" value={qrcode.margin} type="number" min={qrcode.marginMin} max={qrcode.marginMax} onChange={qrcode.changeMargin} width={2} />
            <Form.Input label="color dark" value={qrcode.dark} pattern={qrcode.colorPattern} onChange={qrcode.changeDark} width={2} />
            <Form.Input label="color light" value={qrcode.light} pattern={qrcode.colorPattern} onChange={qrcode.changeLight} width={2} />
          </Form.Group>
          <Divider hidden={true} />
          <Form.Group inline={true}>
            <Form.Input label="icon scale" value={qrcode.iconScale} type="number" step={qrcode.iconScaleStep} min={qrcode.iconScaleMin} max={qrcode.iconScaleMax} onChange={qrcode.changeIconScale} />
            <Button type="button" onClick={this.clickFile} primary={true}>add icon</Button>　{qrcode.uploadedFile ? qrcode.uploadedFile.name : ''} {qrcode.uploadedFile ? `( ${qrcode.uploadedFile.type} )` : ''}
            <input type="file" id="file" />
          </Form.Group>
          <Divider hidden={true} />
          <Form.Group inline={true}>
            <Button.Group>
              <Button type="button" onClick={qrcode.resetAction}>Reset</Button>
              <Button.Or />
              <Button type="button" positive={true} onClick={qrcode.toCanvas} disabled={!Boolean(qrcode.text)} >Create</Button>
            </Button.Group>
          </Form.Group>
        </Form>
        <Divider hidden={true} />
        <Segment compact={true}>
          <canvas id="canvas" />
        </Segment>
      </Segment>
    );
  }
}

export default Qrcode;
