import * as React from 'react';
let injectSheet = require('react-jss').default;
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { PortEntry } from '../../models/workflow';
import { CenteredContent } from '../../util/centered-content'
import { translate } from '../../services/translation-service';
import { EditorState } from '../../components/step-editor/variables-editor';
import { Option } from 'react-select';
import Select from 'react-select';

const styles = (theme: any) => ({
    labelContainer: {
    composes: 'pure-u-1-3',
        textAlign: 'right'
    },
    fieldContainer: {
        composes: 'pure-u-2-3'
    },
    doubleLabelContainer: {
        composes: 'pure-u-1-3 pure-u-lg-1-6',
        textAlign: 'right'
    },
    doubleFieldContainer: {
        composes: 'pure-u-2-3 pure-u-lg-5-6'
    },
    label: {
        paddingRight: '5px'
    },
    input: {
        composes: `code pure-input-1 input-text native-key-bindings`
    }
});

export class PortEntrySource implements PortEntry {
    @observable name?: string = '';
    @observable containerPort: number;
    @observable internalPort?: number;
    @observable externalPort?: number;
    @observable protocol?: 'tcp' | 'udp';
}

export function portEntrySourceFactory(): PortEntrySource {
    return new PortEntrySource();
}

export function portEditorFactory(source: PortEntry, state: EditorState) {
    return <PortEditor
        source={source}
        onChange={() => state.commitIfNecessary()} />;
}

export interface PortEditorProps {
    source: PortEntry;
    onChange: () => void;
    classes?: any;
}

@injectSheet(styles)
@observer
export class PortEditor extends React.Component<PortEditorProps> {
    constructor(props: PortEditorProps) {
        super(props);
    }

    private notifyChange() {
        if (this.props.onChange) {
            this.props.onChange();
        }
    }

    @action
    private setName(name: string) {
        this.props.source.name = name;
        this.notifyChange();
    }

    @action
    private setContainerPort(value: number) {
        if (this.props.source.containerPort !== value) {
            this.props.source.containerPort = value;
            this.notifyChange();
        }
    }

    @action
    private setInternalPort(value: number) {
        if (this.props.source.internalPort !== value) {
            this.props.source.internalPort = value;
            this.notifyChange();
        }
    }

    @action
    private setExternalPort(value: number) {
        if (this.props.source.externalPort !== value) {
            this.props.source.externalPort = value;
            this.notifyChange();
        }
    }

    @action
    private setProtocol(value: any) {
        this.props.source.protocol = value;
        this.notifyChange();
    }

    public render() {
        let classes = this.props.classes || {};
        let portProtocols = [{ label: 'tcp', value: 'tcp' }, { label: 'udp', value: 'udp' }]

        return <div>
            <div className="pure-g block not-block-md">
                <div className="pure-u-1 pure-u-lg-1-2 block-md">
                    <div className="pure-g">
                        <label className={classes.labelContainer}>
                            <CenteredContent>
                                <span className={classes.label}>{translate('LABEL_CONTAINER_PORT')}:</span>
                            </CenteredContent>
                        </label>
                        <div className={classes.fieldContainer}>
                            <input className={classes.input}
                                type="text"
                                value={this.props.source.containerPort || ''}
                                onChange={e => this.setContainerPort(parseInt(e.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="pure-u-1 pure-u-lg-1-2 block-md">
                    <div className="pure-g">
                        <label className={classes.labelContainer}>
                            <CenteredContent>
                                <span className={classes.label}>{translate('LABEL_INTERNAL_PORT')}:</span>
                            </CenteredContent>
                        </label>
                        <div className={classes.fieldContainer}>
                            <input className={classes.input}
                                type="text"
                                value={this.props.source.internalPort || ''}
                                onChange={e => this.setInternalPort(parseInt(e.target.value))} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="pure-g block not-block-md">
                <div className="pure-u-1 block-md">
                    <div className="pure-g">
                        <label className={classes.doubleLabelContainer}>
                            <CenteredContent>
                                <span className={classes.label}>{translate('LABEL_NAME')}:</span>
                            </CenteredContent>
                        </label>
                        <div className={classes.doubleFieldContainer}>
                            <input className={classes.input}
                                
                                type="text"
                                value={this.props.source.name || ''}
                                onChange={e => this.setName(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="pure-g">
                <div className="pure-u-1 pure-u-lg-1-2 block-md">
                    <div className="pure-g">
                        <label className={classes.labelContainer}>
                            <CenteredContent>
                                <span className={classes.label}>{translate('LABEL_EXTERNAL_PORT')}:</span>
                            </CenteredContent>
                        </label>
                        <div className={classes.fieldContainer}>
                            <input className={classes.input}
                                type="text"
                                value={this.props.source.externalPort || ''}
                                onChange={e => this.setExternalPort(parseInt(e.target.value))} />
                        </div>
                    </div>
                </div>
                <div className="pure-u-1 pure-u-lg-1-2 block-md">
                    <div className="pure-g">
                        <label className={classes.labelContainer}>
                            <CenteredContent>
                                <span className={classes.label}>{translate('LABEL_PROTOCOL')}:</span>
                            </CenteredContent>
                        </label>
                        <div className={classes.fieldContainer}>

                            <Select
                                className={classes.tagSelect}
                                clearable={false}
                                searchable={false}
                                options={portProtocols}
                                onChange={option => this.setProtocol((option as Option).value as string)}
                                value={this.props.source.protocol || 'tcp'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
