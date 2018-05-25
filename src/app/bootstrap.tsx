import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {toJS, reaction } from 'mobx';


import { EditorState, ScriptEditorFactory, SfLinkFactory } from './models/state'
import { Workflow } from './models/workflow'
import { IWorkflow } from "./models/workflow";

import { WorkflowService } from './services/workflow_service'

import { WorkflowEditor } from './components/workflow-editor'

let jss: any = require('react-jss').jss,
    JssProvider: any = require('react-jss').JssProvider,
    ThemeProvider: any = require('react-jss').ThemeProvider,
    jssComposer: any = require('jss-compose').default,
    jssNested: any = require('jss-nested').default;

jss.use(jssComposer());
jss.use(jssNested());

export interface IWorkFlowEditorIO {
    getWorkflow: () => IWorkflow;
    destroy: () => void;
    onDirty: (callback: Function) => () => void;
}

export class WorkFlowEditorIO implements IWorkFlowEditorIO {
    private onChangeSubs: Function[] = [];

    constructor (private editorState: EditorState, private parentElement: Element) {

        let theme = {
            ide: editorState.ide
        };

        ReactDOM.render((
            <JssProvider jss={jss}>
            <ThemeProvider theme={theme}>
                <WorkflowEditor state={this.editorState} workflow={this.editorState.workflow}></WorkflowEditor>
            </ThemeProvider>
            </JssProvider>
        ), parentElement);

        reaction(() => {
            return toJS(this.editorState.workflow.steps);
        }, workflow => { 
            for (var i = 0; i < this.onChangeSubs.length; i++) {
                this.onChangeSubs[i]();
            }
         })
    }

    public getWorkflow (): IWorkflow {
        return this.editorState.workflow.toJS();
    };

    public onDirty (callback: Function) {
        this.onChangeSubs.push (callback);

        return () => {
            this.onChangeSubs.splice(this.onChangeSubs.indexOf(callback), 1);
        };
    };

    public destroy () {
        ReactDOM.unmountComponentAtNode(this.parentElement);
    }
}

export function bootstrap(
    element: Element, 
    ide: boolean,
    allowCalls: boolean,
    workflow: IWorkflow, 
    scriptEditorFactory: ScriptEditorFactory,
    sfLinkFactory: SfLinkFactory): IWorkFlowEditorIO {

    let state = new EditorState();
    new WorkflowService().getWorkflowImagesCatalog()
        .then(response => state.setCatalog(response));

    state.workflow = Workflow.apply(workflow) || new Workflow();
    state.ide = ide;
    state.allowCalls = allowCalls;
    state.scriptEditorFactory = scriptEditorFactory;
    state.sfLinkFactory = sfLinkFactory;
    
    if (ide) {
        (window as any).ide = ide;
    }

    return new WorkFlowEditorIO(state, element);
}

//import { observable, action, toJS, spy, reaction } from 'mobx';
//import { WorkflowStepSimple, WorkflowStepCompound } from './models/workflow'