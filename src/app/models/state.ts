import { observable, action } from 'mobx';

import {CatalogImage} from './catalog';
import {Workflow, WorkflowStep, WorkflowStepSimple} from './workflow';
import { StepType } from "../models/workflow";

export type ScriptEditorFactory = (step: WorkflowStepSimple, fieldName: string) => JSX.Element;
export type SfLinkFactory = (link: string, text: string) => JSX.Element;

export class EditorState {
    ide: boolean;
    allowCalls: boolean;
    @observable workflow: Workflow;
    @observable currentStep?: WorkflowStep;
    @observable catalog: CatalogImage[];
    scriptEditorFactory: ScriptEditorFactory;
    sfLinkFactory: SfLinkFactory;

    @action setCatalog(catalog: CatalogImage[]) {
        this.catalog = catalog;
    }

    @action selectInitialStep() {
        if (this.workflow && this.workflow.steps && this.workflow.steps.length > 0) {
            this.selectStep(this.workflow.steps[0]);
        }
    }

    @action selectStep(step: WorkflowStep) {
        this.currentStep = step;
    }

    @action clearSelectedStep() {
        this.currentStep = undefined;
    }

    @action deleteStep(step: WorkflowStep) {
        this.workflow.deleteStep(step);

        if (this.currentStep === step) {
            this.selectInitialStep();
        }
    }

    @action changeCurrentStepType(type: StepType) {
        this.currentStep = this.workflow.changeStepType(this.currentStep, type);
    }
};

//import {ImageSource} from './workflow';