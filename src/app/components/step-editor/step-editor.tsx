
import * as React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
let injectSheet = require('react-jss').default;

import { CatalogImage } from '../../models/catalog';
import {Workflow,WorkflowStep,WorkflowStepSimple,} from '../../models/workflow';
import { EditorState, ScriptEditorFactory, SfLinkFactory } from '../../models/state';
import { StepTypeSelect } from '../step-type-select';
import { SimpleStepEditor } from './simple-step-editor';
import { CenteredContent } from '../../util/centered-content';
import { ChangeEvent } from 'react';
import { FormReactComponent } from '../react-forms/validating-react-component';
import { Field } from "../react-forms/field";
import { StepType } from "../../models/workflow";
import { mediaQueries } from '../../style';
import { translate } from '../../services/translation-service';
import { ErrorPanel } from '../../components/error-panel';


export interface WorkflowStepTypeChangeEvent {
    step: WorkflowStep;
    type: string;
};

export interface StepEditorProps {
    state: EditorState,
    ide: boolean,
    step: WorkflowStep,
    workflow: Workflow,
    catalog: CatalogImage[],
    scriptEditorFactory: ScriptEditorFactory,
    sfLinkFactory: SfLinkFactory,
    classes?: any
}

const styles = (theme: any) => {
    return {
        form: {
            composes: theme.ide ? '' : 'pure-form',
        },
        formInner: {
            minWidth: '100%'
        },
        stepNameDiv: {
            composes: 'pure-g pure-u-1 pure-u-lg-1-2 block-md',
            position: 'relative',
            [mediaQueries.lg]: {
                marginBottom: '0px'
            }
        },
        stepNameLabel: {
            composes: 'pure-u-1-4 pure-u-md-1-6 pure-u-lg-1-3',
            fontSize: theme.ide ? '2em' : '26px',
            paddingRight: '10px',
            height: '100%',
            textAlign: 'right',

            '& > label': {
                height: '100%'
            }
        },
        stepNameInputDiv: {
            composes: 'pure-u-3-4 pure-u-md-5-6 pure-u-lg-2-3',
            height: '100%'
        },
        stepNameInput: {
            composes: 'pure-u-1 input-text native-key-bindings',
            height: '100%',
            margin: '0 !important',
            fontSize: theme.ide ? '2em' : '26px',
        },
        stepTypeInputDiv: {
            composes: 'pure-u-1 pure-u-lg-1-2 step-type-input',

            [mediaQueries.lg]: {
                paddingLeft: '10px'
            }
        }
    };
};

@injectSheet(styles)
@observer
export class StepEditor extends FormReactComponent<StepEditorProps, {}> {
    private nameField: Field;

    constructor(props: StepEditorProps) {
        super(props);

        this.nameField = this.createField('props.step.name', value => {
            let errors: string[] = [],
                stepFoundPos = this.props.workflow.findStep(step => step.name === value);

            if (!value || value.length === 0) {
                errors.push('requiredField');
            }
            if (stepFoundPos && stepFoundPos.parent.steps[stepFoundPos.index] !== this.props.step) {
                errors.push('nameConflict');
            }

            return errors;
        });
    }

    @action
    dismissErrors () {
        this.props.step.transient.errorsDismissed = true;
    }

    public render() {
        let classes = this.props.classes;
        return (
            <form className={classes.form}>
                <fieldset className={classes.formInner}>
                    {
                        this.props.step.transient.parseError.length > 0 && !this.props.step.transient.errorsDismissed &&
                        <ErrorPanel 
                            message={translate('STEP_HAS_ERRORS', this.props.step.transient.parseError.join(', '))}
                            onClose={() => this.dismissErrors()}/>
                    }
                    <div className="pure-g block">
                        <div className={classes.stepNameDiv}>
                            <div className={classes.stepNameLabel}>
                                <CenteredContent>Step:</CenteredContent>
                            </div>
                            <div className={classes.stepNameInputDiv}>
                                <input type="text"
                                    className={classes.stepNameInput}
                                    
                                    name="name"
                                    value={this.nameField.fieldVal || ''} onChange={e => this.onNameChange(e)} />
                            </div>
                        </div>
                        <div className={classes.stepTypeInputDiv}>
                            <StepTypeSelect
                                type={(this.props.step && this.props.step.type || 'sequential')}
                                onChange={this.onTypeChange}></StepTypeSelect>
                        </div>
                    </div>
                    {this.props.step && this.props.step.type === 'compound' ?
                        null :
                        (<SimpleStepEditor
                            sfLinkFactory={this.props.sfLinkFactory}
                            scriptEditorFactory={this.props.scriptEditorFactory}
                            workflow={this.props.workflow}
                            ide={this.props.ide}
                            allowCalls={this.props.state.allowCalls}
                            catalog={this.props.catalog}
                            step={this.props.step as WorkflowStepSimple}>
                        </SimpleStepEditor>)}
                </fieldset>
            </form>);
    }

    private onTypeChange = (type: StepType) => {
        this.props.state.changeCurrentStepType(type);
    }

    @action
    private onNameChange(event: ChangeEvent<HTMLInputElement>) {
        this.updateField(this.nameField, event.target.value);
    }
}


//const CloseIcon = require('react-icons/lib/go/x');
//import {WorkflowStepCompound} from '../../models/workflow';
//import { setTimeout } from 'timers';
//import { WorkflowService } from '../../services/workflow_service';
