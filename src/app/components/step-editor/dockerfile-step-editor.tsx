import * as React from 'react';
import { WorkflowStepSimple } from "../../models/workflow";
import { CenteredContent } from "../../util/centered-content";
import { translate } from '../../services/translation-service';
import { observer } from 'mobx-react';
import { action } from 'mobx';

//import { EditorState } from '../../models/state';
//import {  Workflow } from "../../models/workflow";

let injectSheet = require('react-jss').default;

const styles = (theme: any) => ({
    label: {
        composes: 'pure-u-1-6 text-right',
        paddingRight: '5px'
    }
});

export interface DockerfileStepEditorProps {
step: WorkflowStepSimple,
classes?: any
}


@injectSheet(styles)
@observer
export class DockerfileStepEditor extends React.Component<DockerfileStepEditorProps, {}> {
    constructor(props) {
        super(props);
    }
    @action
    private onDockerfileChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.step.dockerfile = event.target.value;
    }
    public render() {
        return (
            <div className="pure-g">
                <div className={this.props.classes.label}>
                    <CenteredContent>
                        <span>{translate('LABEL_DOCKERFILE')}:</span>
                    </CenteredContent>
                </div>
                <div className="pure-u-5-6">
                    <input
                        type="text"
                        className="pure-input-1 input-text native-key-bindings"
                        name="image"
                        value={this.props.step.dockerfile || ''}
                        onChange={e => this.onDockerfileChange(e)} />
                </div>
            </div>);
    }
}