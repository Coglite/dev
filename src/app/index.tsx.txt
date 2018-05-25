import * as React from 'react';
import { bootstrap } from './bootstrap';
import { Workflow, WorkflowStepSimple } from './models/workflow';
import {StepCodeEditor} from './components/step-code-editor'


bootstrap(
    document.getElementById('root'), 
    false, 
    true,
    new Workflow(),
    (step: WorkflowStepSimple, fieldName: string) => {
        return <StepCodeEditor step={step} fieldName={fieldName}/>
    },
    (url: string, text: string) => <a href={url} target="_blank">{text}</a>
);