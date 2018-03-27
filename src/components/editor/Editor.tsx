/**
 * Code editor
 */
import './style.scss';
import 'brace';
import 'brace/mode/css';
import 'brace/mode/javascript';
import 'brace/mode/jsx';
import 'brace/theme/chaos';

import { observer } from 'mobx-react';
import * as React from 'react';

const AceEditor = require('react-ace').default;

const { DropTarget } = require('react-dnd');
interface ISequencePanelProps {
    connectDropTarget?: any;
    code: string;
    mode: string;
    onChange: (code: string, position: any) => void;
    onClick: (posision: any) => void;
    onSave: (code: string) => void;
}

const squareTarget = {
  drop(props, monitor) {
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

@observer
@DropTarget('ACTION', squareTarget, collect)
export class Editor extends React.Component<ISequencePanelProps, {x: number, y: number}> {
    public connection: any;
    ace: any;

    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0
        };
    }

    componentDidMount(){
        this.ace.on('click', (e) => {
            this.props.onClick(this.ace.editor.getCursorPosition());
            this.setState({
                x: e.x,
                y: e.y
            });
        });

        this.ace.commands.addCommand({
            name: 'save',
            exec: () => {
                this.props.onSave(this.ace.editor.getValue());
            },
            bindKey: {mac: 'cmd-s', win: 'ctrl-s'}
        });

    }

    public onChange = (newValue) => {
        this.props.onChange(newValue, this.ace.editor.getCursorPosition());
    }

    public insertInCursor = (code: string) => {
        this.insertInPosition(this.ace.editor.getCursorPosition(), code);
    }

    public insertInPosition = (position: any, code: string) => {
        this.ace.editor.session.insert(position, code);
    }

    public render() {
        const { connectDropTarget } = this.props;
        return connectDropTarget(
            <div style={{position: 'relative', height: '94vh', width: '100%'}}>
                <AceEditor
                    ref={ace => this.ace = ace}
                    mode={this.props.mode}
                    theme='chaos'
                    name='UNIQUE_ID_OF_DIV'
                    editorProps={{$blockScrolling: true}}
                    onChange={this.onChange}
                    value={this.props.code}
                    fontSize={14}
                    height='inherit'
                    width='inherit'
                />
            </div>
        );
    }
}
