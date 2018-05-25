import * as React from 'react';
let injectSheet = require('react-jss').default;
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { KeyValueEntry, KeyValueEntryType } from '../../models/workflow';
import { CenteredContent } from '../../util/centered-content'
import { translate } from '../../services/translation-service';
import { EditorState } from '../../components/step-editor/variables-editor';

const styles = (theme: any) => ({
    labelContainer: {
        composes: 'pure-u-1-4',
        textAlign: 'right'
    },
    fieldContainer: {
        composes: 'pure-u-3-4'
    },
    doubleLabelContainer: {
        composes: 'pure-u-1-4 pure-u-lg-1-8',
        textAlign: 'right'
    },
    doubleFieldContainer: {
        composes: 'pure-u-3-4 pure-u-lg-7-8'
    },
    label: {
        paddingRight: '5px'
    },
    input: {
        composes: `code pure-input-1 input-text native-key-bindings`
    }
});

export interface VariableEditorProps {
    source: KeyValueEntry;
    sourceType: KeyValueEntryType;
    onChange: () => void;
    classes?: any;
}

export class VariableSource implements KeyValueEntry {
    @observable file?: string = '';
    @observable name?: string = '';
    @observable value?: string = '';
}

export function variableSourceFactory(): VariableSource {
    return new VariableSource();
}

export function variableEditorFactory(source: KeyValueEntry, state: EditorState) {
    return <VariableEditor
        source={source}
        sourceType={state.committed ? (source.file ? 'file' : 'pair') : state.sourceType}
        onChange={() => state.commitIfNecessary()} />;
}

@injectSheet(styles)
@observer
export class VariableEditor extends React.Component<VariableEditorProps> {
    constructor(props: VariableEditorProps) {
        super(props);
    }

    private notifyChange() {
        if (this.props.onChange) {
            this.props.onChange();
        }
    }

    @action
    private setFile(file: string) {
        this.props.source.file = file;
        this.notifyChange();
    }

    @action
    private setName(name: string) {
        this.props.source.name = name;
        this.notifyChange();
    }

    @action
    private setValue(value: string) {
        this.props.source.value = value;
        this.notifyChange();
    }

    public render() {
        let classes = this.props.classes || {};
        return this.props.sourceType === 'pair' ?
            (<div className="pure-g">
                <div className="pure-u-1 pure-u-lg-1-2 block-md">
                    <div className="pure-g">
                        <label className={classes.labelContainer}>
                            <CenteredContent>
                                <span className={classes.label}>{translate('LABEL_NAME')}:</span>
                            </CenteredContent>
                        </label>
                        <div className={classes.fieldContainer}>
                            <input className={classes.input}
                                
                                type="text"
                                value={this.props.source.name}
                                onChange={e => this.setName(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="pure-u-1 pure-u-lg-1-2 block-md">
                    <div className="pure-g">
                        <label className={classes.labelContainer}>
                            <CenteredContent>
                                <span className={classes.label}>{translate('LABEL_VALUE')}:</span>
                            </CenteredContent>
                        </label>
                        <div className={classes.fieldContainer}>
                            <input className={classes.input}
                                type="text"
                                value={this.props.source.value}
                                onChange={e => this.setValue(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>) :
            (this.props.sourceType === 'file' &&
                <div className="pure-g block-md">
                    <label className={classes.doubleLabelContainer}>
                        <CenteredContent>
                            <span className={classes.label}>{translate('LABEL_FILE')}:</span>
                        </CenteredContent>
                    </label>
                    <div className={classes.doubleFieldContainer}>
                        <input className={classes.input}
                            
                            type="text"
                            value={this.props.source.file}
                            onChange={e => this.setFile(e.target.value)} />
                    </div>
                </div>);
    }
}
