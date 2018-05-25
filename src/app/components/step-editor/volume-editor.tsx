import * as React from 'react';
let injectSheet = require('react-jss').default;
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { Volume } from '../../models/workflow';
import { CenteredContent } from '../../util/centered-content'
import { translate } from '../../services/translation-service';

const styles = (theme: any) => ({
    mountPath: {
        composes: 'pure-u-1-6',
        textAlign: 'right'
    },
    hostPath: {
        composes: 'pure-u-1-6',
        textAlign: 'right'
    },
    label: {
        paddingRight: '5px'
    },
    input: {
        composes: 'pure-input-1 code input-text native-key-bindings'
    }
});

export interface VolumeEditorProps {
    volume: Volume;
    onChange: () => void;
    classes?: any;
}

@injectSheet(styles)
@observer
export class VolumeEditor extends React.Component<VolumeEditorProps> {
    constructor(props: VolumeEditorProps) {
        super(props);
    }

    private notifyChange() {
        if (this.props.onChange) {
            this.props.onChange();
        }
    }

    @action
    private setMountPath(name: string) {
        this.props.volume.mountPath = name;
        this.notifyChange();
    }

    @action
    private setHostPath(value: string) {
        this.props.volume.hostPath = value;
        this.notifyChange();
    }

    public render() {
        let classes = this.props.classes || {};
        return (<div className="pure-g">
                <label className={classes.mountPath}>
                    <CenteredContent>
                        <span className={classes.label}>{translate('LABEL_MOUNT_PATH')}:</span>
                    </CenteredContent>
                </label>
                <div className="pure-u-1-3">
                    <input className={classes.input}
                        type="text"
                        value={this.props.volume.mountPath}
                        onChange={e => this.setMountPath(e.target.value)} />
                </div>
                <label className={classes.hostPath}>
                    <CenteredContent>
                        <span className={classes.label}>{translate('LABEL_HOST_PATH')}:</span>
                    </CenteredContent>
                </label>
                <div className="pure-u-1-3">
                    <input className={classes.input}
                        type="text"
                        value={this.props.volume.hostPath}
                        onChange={e => this.setHostPath(e.target.value)} />
                </div>
            </div>);
    }
}
