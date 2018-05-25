import * as React from 'react';
import { observer } from "mobx-react";


const AngleDown = require('react-icons/lib/fa/angle-down');
const AngleUp = require('react-icons/lib/fa/angle-up');
const ReactTooltip = require('react-tooltip');

//import { IWorkflow } from "../models/workflow";
import { EditorState } from '../models/state';
import { WorkflowStep, Workflow } from '../models/workflow';

import '../util/translations';
import { translate } from '../services/translation-service';

import { StepEditor } from './step-editor/step-editor';
import { StepList } from './step-list';
import { VariablesEditor } from '../components/step-editor/variables-editor';
import { FailureOptions } from '../components/step-editor/failure-options';
import { variableEditorFactory, variableSourceFactory } from '../components/step-editor/variable-editor';


let injectSheet = require('react-jss').default;
import { themeColors, listStyles, sectionStyles, mediaQueries, shadows } from '../style';


const styles = (theme: any) => {
    let list = listStyles(theme);
    let section = sectionStyles(theme);

    list.rootListTree.marginBottom = '0px';
    list.listItem.fontSize = '1.2em';
    list.listItem.paddingLeft = '0px';
    list.listItem.fontWeight = 'bold';

    list.listTitle.color = theme.ide ? undefined : '#666';

    return Object.assign({
        form: {
            composes: theme.ide ? '' : 'pure-form',
        },
        editor: {
            composes: `pure-g padded workflow-editor ${theme.ide ? 'base-ide-style' : 'base-web-style'}`,

            [mediaQueries.md]: {
                padding: theme.ide ? '' : '0px 15px',
            },
        },
        tooltipWrapper: {
            composes: 'pure-u-1',
            position: 'absolute'
        },
        tooltip: {
            composes: theme.ide ? 'ide-tooltip' : '',
        },
        listWrapper: {
            composes: `pure-u-1 pure-u-md-1-4 ${theme.ide ? 'block': ''}`,
            padding: '10px',
            position: 'relative',
            margin: '10px 0px',
            background: theme.ide ? undefined : '#eee',

            [mediaQueries.md]: {
                background: theme.ide ? undefined : 'transparent',
                padding: '0px',
                paddingRight: '10px',
                margin: '0px',
            },
        },
        listWrapperTopShadow : Object.assign({
            [mediaQueries.md]: {
                display: 'none',
            },
        }, shadows.top),
        listWrapperBottomShadow : Object.assign({
            [mediaQueries.md]: {
                display: 'none',
            },
        }, shadows.bottom),
        list: {
            composes: theme.ide ? 'inset-panel padded': '',

            '&.closed': {
                display: 'none',

                [mediaQueries.md]: {
                    display: 'block',
                },
            }
        },
        mainEditor: {
            composes: `pure-u-1 pure-u-md-3-4 ${theme.ide ? 'block': ''}`,
            padding: '0px 10px',

            [mediaQueries.md]: {
                padding: '0px',
            },
        },
        workflowVarsCount: theme.ide? {
            composes: 'badge badge-info',
            marginRight: '5px',
        }: {
            marginRight: '5px',
            
            padding: '0.375em 0.6em',
            minWidth: '1.875em',
            fontWeight: 'normal',
            color: 'white',
            borderRadius: '2em',
            backgroundColor: themeColors.darkerGreen
        },
        listMobileHeader: {
            textAlign: 'center',

            '& > h3': {
                marginTop: '10px',
                marginBottom: '0px'
            },

            '& > hr': {
                marginBottom: '0px'
            },


            [mediaQueries.md]: {
                display: 'none',
            }
        },
        listMobileSwitch: {
            fontSize: '2em',
            lineHeight: '0.5em',
        }
    }, list, section);
};

export interface WorkflowEditorState {
    section: 'step' | 'workflow',
    mobileMenuOpen: boolean
}


export interface WorkflowEditorProps {
    state: EditorState,
    workflow: Workflow,
    classes?: any
}

@injectSheet(styles)
@observer
export class WorkflowEditor extends React.Component<WorkflowEditorProps, {}> {
    public state: WorkflowEditorState = {
        section: 'workflow',
        mobileMenuOpen: false
    }

    constructor(props) {
        super(props);
    }

    private selectStep (step: WorkflowStep) {
        this.setState({section: 'step'});
    }

    componentWillMount () {
        if (this.props.workflow.steps.length) {
            this.props.state.selectInitialStep();
            this.selectStep(this.props.workflow.steps[0]);
        } else {
            this.selectSection('workflow');
        }
    }

    componentWillReceiveProps (nextProps: {workflow: Workflow}) {
        if (nextProps.workflow !== this.props.workflow) {
            if (nextProps.workflow.steps.length) {
                this.props.state.selectInitialStep();
                this.selectStep(nextProps.workflow.steps[0]);
            } else {
                this.selectSection('workflow');
            }
        }
    }

    private selectSection (section: WorkflowEditorState['section']) {
        this.setState({section});
        this.props.state.clearSelectedStep();
    }

    private get selectedItemDescription () {
        //let out = '';

        if (this.state.section === 'workflow') {
            return translate('TITLE_WORKFLOW_VARIABLES');
        }
        else {
            return 'Step - ' + this.props.state.currentStep.name;
        }
    }

    public render() {
        let classes = this.props.classes || {},
            workflowVarCount = this.props.workflow ? this.props.workflow.workflowVariables.length : 0;

        return (
            <div className={classes.editor}>
                <div className={classes.tooltipWrapper}>
                    <ReactTooltip id="workflowEditor" effect="solid" class={classes.tooltip} html={true}/>
                </div>
                <div className={classes.listWrapper}>
                    <div className={classes.listMobileHeader} onClick={() => this.setState({mobileMenuOpen: !this.state.mobileMenuOpen})}>
                        <h3>
                            {this.selectedItemDescription}
                        </h3>
                        <hr/>
                        <span className={classes.listMobileSwitch}>
                            {this.state.mobileMenuOpen ? <AngleUp></AngleUp> : <AngleDown></AngleDown>}
                        </span>
                    </div>
                    <div className={classes.listWrapperTopShadow}></div>
                    <div className={classes.listWrapperBottomShadow}></div>
                    <div className={[classes.list, this.state.mobileMenuOpen ? 'open' : 'closed'].join(' ')}>
                        <ul className={classes.rootListTree}>
                            <li 
                                className={[classes.listItem, this.state.section === 'workflow' ? classes.listItemSelected : ''].join(' ')} 
                                onClick={e => this.selectSection('workflow')}>
                                <span>
                                    <span>{translate('TITLE_WORKFLOW')}</span>
                                </span>
                            </li>
                        </ul>
                        <h3 className={[classes.listTitle, this.state.section === 'step' ? classes.listItemSelected : ''].join(' ')}>{translate('TITLE_STEPS')}</h3>
                        <StepList state={this.props.state} onStepSelect={step => this.selectStep(step)}></StepList>
                        {this.props.children}
                    </div>
                </div>
                <div className={classes.mainEditor}>
                    {this.state.section === 'step' && 
                        <StepEditor
                            state={this.props.state}
                            ide={this.props.state.ide}
                            scriptEditorFactory={this.props.state.scriptEditorFactory}
                            sfLinkFactory={this.props.state.sfLinkFactory}
                            catalog={this.props.state.catalog}
                            workflow={this.props.workflow}
                            step={this.props.state.currentStep}>
                        </StepEditor>}
                    {this.state.section === 'workflow' && 
                        <form className={classes.form}>
                            <div className={[classes.section, workflowVarCount.toString()].join(' ')}>
                                <div className={classes.sectionTitle}>{translate('TITLE_WORKFLOW_VARIABLES')}</div>
                                <div className={classes.sectionBody}>
                                    <VariablesEditor
                                        variables={this.props.workflow ? this.props.workflow.workflowVariables : []}
                                        ide={this.props.state.ide}
                                        sourceEditorFactory={variableEditorFactory} 
                                        sourceFactory={variableSourceFactory}/>
                                </div>
                            </div>
                            <div className={classes.section}>
                                <div className={classes.sectionTitle}>{translate('TITLE_WORKFLOW_FAILURE')}</div>
                                <div className={classes.sectionBody}>
                                    <FailureOptions obj={this.props.workflow} />
                                </div>
                            </div>
                        </form>}
                </div>
            </div>
        );
    }
}


//import 'purecss/build/pure.css';
//import 'purecss/build/grids-responsive.css';
//import 'react-select/dist/react-select.css';
//import 'react-virtualized/styles.css';
//import 'react-virtualized-select/styles.css';