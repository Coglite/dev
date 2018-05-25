import * as React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';

import { WorkflowStepSimple } from "../../models/workflow";

export interface ManualImageFieldProps {
    step: WorkflowStepSimple
    classes?: any
}


@observer
export class ManualImageField extends React.Component<ManualImageFieldProps, {}> {
    constructor(props) {
        super(props);
    }

    @action
    private onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.step.image = event.target.value;
    }

    public render() {
        return (
            <div className="pure-g">
                <div className="pure-u-1 native-key-bindings">
                    <input 
                        type="text" 
                        className="pure-input-1 input-text native-key-bindings"                     
                        name="image" 
                        value={this.props.step.image || ''}
                        onChange={e => this.onImageChange(e)}/>
                </div>
            </div>);
    }
}

//import { Workflow } from "../../models/workflow";
//import { EditorState } from '../../models/state';
