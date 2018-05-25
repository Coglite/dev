import * as React from 'react';
import { WorkflowStepSimple } from "../../models/workflow";
import { CenteredContent } from "../../util/centered-content";
import { translate } from '../../services/translation-service';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { StepWorkflowVariables } from '../../components/step-editor/step-workflow-variables';

//import { EditorState } from '../../models/state';
//import {  Workflow } from "../../models/workflow";

let injectSheet = require('react-jss').default;

const styles = (theme: any) => ({
    label: {
        composes: 'pure-u-1-6 text-right',
        paddingRight: '5px'
    }
});


export interface ExtWorkflowStepEditorProps {
    step: WorkflowStepSimple,
    classes?: any
};


@injectSheet(styles)
@observer
export class ExtWorkflowStepEditor extends React.Component<ExtWorkflowStepEditorProps, {}> {
    constructor(props) {
        super(props);
    }

    @action
    private onWorkflowChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.step.target = event.target.value;
    }

    public render() {
        return (
            <div className="pure-g">
                <div className="pure-u-1 block">
                    <div className={this.props.classes.label}>
                        <CenteredContent>
                            <span>{translate('LABEL_WORKFLOW')}:</span>
                        </CenteredContent>
                    </div>
                    <div className="pure-u-5-6">
                        <input
                            type="text"
                            className="pure-input-1 input-text native-key-bindings"
                            name="image"
                            value={this.props.step.target || ''}
                            onChange={e => this.onWorkflowChange(e)} />
                    </div>
                </div>
                <div className="pure-u-1">
                    <StepWorkflowVariables step={this.props.step}/>
                </div>
            </div>
        );
    }
}