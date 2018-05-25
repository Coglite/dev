import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Dragula from 'dragula';
import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';
const Plus = require('react-icons/lib/go/plus');
const Bars = require('react-icons/lib/fa/bars');
const Trash = require('react-icons/lib/fa/trash');
const AlertIcon = require('react-icons/lib/go/alert');

import { themeColors, listStyles, mediaQueries, noSelectStyle } from '../style';

let injectSheet = require('react-jss').default;

import { Workflow, WorkflowStep, WorkflowStepCompound, WorkflowStepSimple } from '../models/workflow';
import { EditorState } from '../models/state';
import { translate } from '../services/translation-service';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "atom-panel": any
        }
    }
}

const stepListClass = 'step-list';

const styles = (theme: any) => {

    let list = listStyles(theme),
        addButton = {
            composes: theme.ide ? 'btn' : 'pure-button success',
            display: 'block',
            position: 'relative',
            backgroundColor: theme.ide ? undefined : '#f5f5f5',

            '& > div' : {
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },

            [mediaQueries.md]: {
                marginRight: theme.ide ? '0px' : '20px',
            },

            '& svg' : {
                position: 'relative',
                top: '-0.15em',
            },
        },
        deleteButton = Object.assign({}, addButton, {
            composes: theme.ide ? 'btn btn-error' : 'pure-button danger',
        });

    list.listItemSelected['& $stepError'] = {
        color: list.listItemSelected.color
    };

    let styles = {
        addButton,
        deleteButton,
        deleteStepDeleting: {
            composes: theme.ide ? '' : 'pure-button-hover',
        },
        stepPrefix: {
            fontWeight: 'bold'
        },
        hidden: {
            display: 'none'
        },
        handle: Object.assign({
            position: 'absolute !important',
            top: '0px',
            right: theme.ide ? '0px' : '25px',
            cursor: 'move',
        }, noSelectStyle),
        handleIcon: {
            composes: theme.ide ? 'icon icon-grabber' : '',
        },
        handleDragger: {
            composes: 'dragula-handle',
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
        },
        stepError: {
            composes: theme.ide ? 'text-color-error' : '',

            color: theme.ide ? undefined : themeColors.darkerRed,
            marginRight: '5px'
        }
    }

    return Object.assign(list, styles);
};

export interface StepListProps {
    state: EditorState;
    onStepSelect?: (step: WorkflowStep) => void
    classes?:any;
}

@injectSheet(styles)
@observer
export class StepList extends React.Component<StepListProps, {}> {
    private drake: Dragula.Drake;
    public state = {
        dragging: false,
        deleting: false
    };
    private deleteDiv: HTMLElement;

    constructor(props: StepListProps) {
        super(props);
    }

    private get currentStep() {
        return this.props.state.currentStep;
    }

    private get workflow() {
        return this.props.state.workflow;
    }

    @action
    private addStep = () => {
        this.props.state.workflow.addStep();
    }

    private selectStep(step: WorkflowStep, event: React.MouseEvent<HTMLLIElement>) {
        this.props.state.selectStep(step);
        this.props.onStepSelect && this.props.onStepSelect(step);
        event.stopPropagation();
    }

    private stepPrefix(parentList: WorkflowStep[], index: number): string {
        if (index === 0) {
            return '';
        }
        else if (parentList[index - 1].type === "sequential") {
            let step = parentList[index - 1] as WorkflowStepSimple;
            
            if (step.type === 'sequential') {
                return 'Then';
            }
            else if (step.type === 'parallel') {
                return 'And';
            }
            else if (step.type === 'service') {
                return 'After ready';
            }
        }
        else if (parentList[index - 1].type === 'compound') {
            let compoundStep = parentList[index - 1] as WorkflowStepCompound;
            if (compoundStep.steps.length > 0) {
                return this.stepPrefix(compoundStep.steps, compoundStep.steps.length);
            }
            else {
                return this.stepPrefix(parentList, index - 1);
            }
        }

        return '';
    }

    private onDragEnd = (el: Element) => {
        this.setState({dragging: false, deleting: false});
    }

    private onDrop = (el: Element, target: Element, source: Element, sibling: Element) => {
        
        if (!this.state.deleting) {
            this.drake.cancel(true);
            let siblingStep: WorkflowStep = sibling && (sibling as any).relatedStep,
                parentStep: WorkflowStepCompound | Workflow = (target as any).parentStep;

            
            let targetIndex = siblingStep ? this.props.state.workflow.findStep(siblingStep, parentStep).index : parentStep.steps.length
            this.props.state.workflow.moveStep(
                (el as any).relatedStep,
                targetIndex, 
                parentStep);
        }
        else {
            this.drake.cancel(true);
        }
    }
    
    private onDrag = (el: Element, source: Element) => {
        if (source.classList.contains(stepListClass)) {
            this.setState({dragging: true});
        }
    }
    
    private onCancel = (el: Element, container: Element, source: Element) => {
        if (this.state.deleting) {
            this.props.state.deleteStep((el as any).relatedStep);
        }
    }

    componentDidMount() {
        let container = ReactDOM.findDOMNode(this),
            list = container.querySelectorAll('.' + stepListClass),
            classes = this.props.classes;
        this.drake = Dragula(Array.prototype.slice.call(list), {
            mirrorContainer: container,
            accepts: (el: Element, target: Element, source: Element, sibling: Element) => {
                if (target === this.deleteDiv) {
                    this.setState({deleting: true});
                    return false;
                }
                else {
                    this.setState({deleting: false});
                }

                let parent = target.parentElement;
                while (parent !== null) {
                    if (parent === el) {
                        return false;
                    }
                    parent = parent.parentElement;
                }

                return true;
            },
            moves: (el: Element, target: Element, handle: Element) => {
                return handle.classList.contains('dragula-handle');
            },
            isContainer: (el: Element) => {
                return el.classList.contains(stepListClass);
            }
        });

        this.drake.on('drag', this.onDrag);
        this.drake.on('dragend', this.onDragEnd);
        this.drake.on('cancel', this.onCancel);
        this.drake.on('drop', this.onDrop);
    }

    componentWillUnmount() {
        this.drake.destroy();
    }

    private stepClasses(step: WorkflowStep) {
        let classes = this.props.classes || {};
        try {
            return classes.listItem +
                (this.currentStep === step ? ' ' + classes.listItemSelected : '') +
                (step.type == 'compound' ? ' ' + classes.listItemSubList : '');
        }
        catch(e) {
            throw(e);   
        }
    }

    private stepTitle(parentList: WorkflowStep[], step: WorkflowStep, key: number) {
        let classes = this.props.classes || {},
            prefix = this.stepPrefix(parentList, key);
        return (
            <span>
                {step.transient.parseError.length > 0 && !step.transient.errorsDismissed && <AlertIcon className={classes.stepError}/>}
                {prefix.length > 0 && <span className={classes.stepPrefix}>{this.stepPrefix(parentList, key)}&nbsp;</span>}
                {step.name && step.name.length > 0 ? step.name : '(Unnamed step)'}
            </span>);
    }

    setStep = (el: HTMLLIElement, parent: any, step: any) => {
        if (el) {
            if (parent) {}
            (el as any).relatedStep = step;
        }
    }

    private StepHandle () {
        return <div className={this.props.classes.handle}>
            <div className={this.props.classes.handleDragger}></div>
            {this.props.state.ide ? <span className={this.props.classes.handleIcon}></span> : <Bars className={this.props.classes.handleIcon}/>}
        </div>
    }

    private subSteps(parent: WorkflowStep | Workflow): JSX.Element {
        let classes = this.props.classes || {};

        let rootList = parent instanceof Workflow;
        if (parent instanceof WorkflowStepCompound || parent instanceof Workflow) {
            return (
                <ul className={`${stepListClass} ${rootList ? classes.rootListTree : classes.listTree}`} ref={el => el && ((el as any).parentStep = parent)}>
                    {parent.steps.map((step, i) => (
                        <li 
                            className={this.stepClasses(step)} 
                            key={'step-' + i + '-' + step.name} 
                            ref={el => this.setStep(el, parent, step)}
                            onClick={e => this.selectStep(step, e)}>
                            {this.stepTitle(parent.steps, step, i)}
                            {this.StepHandle ()}
                            {step instanceof WorkflowStepCompound && this.subSteps(step)}
                        </li>))}
                </ul>);
        }

        return null;
    }

    public render () {
        const classes = this.props.classes || {};
        
        return (
            <div>
                {this.subSteps(this.props.state.workflow)}
                <div 
                    ref={(div) => { this.deleteDiv = div; }}
                    onClick={this.addStep}
                    className={[
                        stepListClass,
                        (this.state.dragging ? classes.deleteButton : classes.addButton),
                        (this.state.deleting ? classes.deleteStepDeleting : '')].join(' ')
                    }>
                    {this.state.dragging ? 
                        <span><Trash />{translate('DELETE')}...</span> :
                        <span><Plus /> {translate('ADD_STEP')}...</span> }
                    <div></div>
                </div>
            </div>)
    }
}
