import * as React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
const Text = require('react-icons/lib/fa/font');
const File = require('react-icons/lib/fa/file-text-o');
const Remove = require('react-icons/lib/fa/times-circle');

import { Options } from '../options';
import { KeyValueEntry, KeyValueEntryType } from '../../models/workflow';


import { mediaQueries } from '../../style';

let injectSheet = require('react-jss').default;

const jssStyles = (theme: any) => ({
    fieldBlock: {
        composes: 'pure-g block-force base-border-color component-padding-bottom',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: theme.ide ? undefined : '#ddd',
        paddingBottom: '10px',

        '&:last-child': {
            borderBottom: 'none',
            paddingBottom: '0px'
        },
    },
    editorDiv: {
        composes: 'pure-u-1 pure-u-lg-5-6'
    },
    optionSettings: {
        composes: 'pure-u-1 pure-u-lg-1-6',
        textAlign: 'right',
        paddingLeft: '0px',

        [mediaQueries.lg]: {
            paddingLeft: '10px'
        }
    },
    options: {
        '& > .btn-group': {
            width: '100%',

            '& > button': {
                width: '50%'
            }
        }
    },
    deleteButton: {
        composes: theme.ide ? 'btn btn-error btn-block' : 'pure-button danger',
        width: '100%',
        display: 'block',

        '& > svg': {
            position: 'relative',
            display: 'inline-block',
            top: '-0.10em'
        }
    }
});

export interface VariablesEditorProps {
    variables: any[];
    ide: boolean;
    onlyPairs?: boolean;
    classes?: any;
    sourceEditorFactory: (source: any, state: EditorState) => JSX.Element;
    sourceFactory: () => any;
}

export class EditorState {
    constructor(
        private variables: any[],
        private source: any,
        public committed: boolean,
        public sourceType: any) {
    }

    commitIfNecessary() {
        if (!this.committed) {
            this.variables.push(this.source);
            this.committed = true;
        }
    }
}

@injectSheet(jssStyles)
@observer
export class VariablesEditor extends React.Component<VariablesEditorProps, { sourceType: KeyValueEntryType }> {
    constructor(props: VariablesEditorProps) {
        super(props);
    }

    componentWillMount() {
        this.setState({ sourceType: 'pair' });
    }

    private get variables(): KeyValueEntry[] {
        return this.props.variables;
    }

    private sourceTypeEditor() {
        return <div className="pure-g">
            <div className="pure-u-1-4 pure-u-lg-0">
            </div>
            <div className="pure-u-3-4 pure-u-lg-1">
                <Options
                    selected={this.state && this.state.sourceType}
                    ide={this.props.ide}
                    className={this.props.classes.options}
                    onChange={a => this.setSourceType(a.value)}
                    options={this.sourceTypes()} />
            </div>
        </div>;
    }

    @action
    private remove(e: React.MouseEvent<HTMLButtonElement>, source: KeyValueEntry) {
        this.variables.splice(this.variables.indexOf(source), 1);
        e.preventDefault();
    }

    private sourceEditor(source: KeyValueEntry, key: number, committed: boolean) {
        let editor = this.props.sourceEditorFactory(source, new EditorState(this.variables, source, committed, this.state.sourceType));

        return (<div className={this.props.classes.fieldBlock} key={key}>
            <div className={this.props.classes.editorDiv}>{editor}</div>
            <div className={this.props.classes.optionSettings}>
                {committed && this.deleteButton(source)}
                {!committed && !this.props.onlyPairs && this.sourceTypeEditor()}
            </div>
        </div>);
    }

    private deleteButton (source: KeyValueEntry) {
        return <div className="pure-g">
                <div className="pure-u-1-4 pure-u-lg-0">
                </div>
                <div className="pure-u-3-4 pure-u-lg-1">
                    <button className={this.props.classes.deleteButton} onClick={e => this.remove(e, source)}><Remove /> Remove</button>
                </div>
            </div>;
    }

    private sourceEditors() {
        let editors = [];

        if (this.variables) {
            for (let i = 0; i <= this.variables.length; i++) {
                let source = undefined;
                let committed = false;

                if (i < this.variables.length) {
                    source = this.variables[i];
                    committed = true;
                } else {
                    source = this.props.sourceFactory();
                }

                editors.push(this.sourceEditor(source, i, committed));
            } 
        } else {
            editors.push(this.sourceEditor(this.props.sourceFactory(), 0, false));
        }

        return editors;
    }

    private sourceTypes() {
        return [
            {
                display: (<Text />),
                value: 'pair'
            },
            {
                display: (<File />),
                value: 'file'
            }
        ];
    }

    private setSourceType(source: KeyValueEntryType) {
        this.setState({ sourceType: source });
    }

    public render() {
        return (<div>
            {this.sourceEditors()}
        </div>);
    }
}

//import { WorkflowStepSimple } from '../../models/workflow';
//import { translate } from '../../services/translation-service';
//import { VariableEditor } from './variable-editor';