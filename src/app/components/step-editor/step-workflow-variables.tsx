import * as React from 'react';
import { action} from 'mobx';
import { observer } from 'mobx-react';

let injectSheet = require('react-jss').default;

import { editorStyles, sectionStyles } from '../../style';

import { WorkflowStepSimple } from '../../models/workflow';
import { translate } from '../../services/translation-service';
import { Creatable, Option, OptionValues } from 'react-select';
import { CenteredContent } from '../../util/centered-content';


export interface StepWorkflowVariablesProps {
    step: WorkflowStepSimple;
    classes?: any;
}

const jssStyles = (theme: any) => {
    let section = sectionStyles(theme);
    
    return Object.assign({
        label: {
            composes: 'pure-u-1-4 text-right',
            paddingRight: '5px'
        },
        selectInput: {
            composes: theme.ide ? 'text-color' : ''
        },
        inputsDiv: {
            '& .Select-arrow-zone': {
                display: 'none'
            }
        }
    }, section);
};

@injectSheet(jssStyles)
@observer
export class StepWorkflowVariables extends React.Component<StepWorkflowVariablesProps, {}> {
    constructor(props: StepWorkflowVariablesProps) {
        super(props);

        this.props.step.includeVariables = this.props.step.includeVariables || [];
        this.props.step.excludeVariables = this.props.step.excludeVariables || [];
    }

    private get includeVariables(): string[] {
        return this.props.step.includeVariables as string[];
    }

    private get excludeVariables(): string[] {
        return this.props.step.excludeVariables as string[];
    }

    @action
    private add(variables: Option<OptionValues>, arrayName: 'includeVariables' | 'excludeVariables') {
        if (variables) {
            let newVars: string[] = [];
            for (let i = 0; i < variables.length; i++) {
                newVars.push(variables[i].value);
            }
            this.props.step[arrayName] = newVars;

            if (arrayName === 'includeVariables') {
                this.props.step.transient.explicitIncludeVariables = true;
            }
            else {
                this.props.step.transient.explicitExcludeVariables = true;
            }
        }
    }

    private promptTextCreator = (label: string): string => {
        return translate('LABEL_VARIABLE_PROMPT', label);
    }
    
    shouldKeyDownEventCreateNewOption (arg: { keyCode: number }) {
        return arg.keyCode === 32 || arg.keyCode === 9 || arg.keyCode === 13 || arg.keyCode === 188;
    }

    public render() {
        let classes = this.props.classes || {};
        let includeVariablesArray: Option[] = [];
        let excludeVariablesArray: Option[] = [];

        this.includeVariables.forEach(variable => includeVariablesArray.push({ label: variable, value: variable }));
        this.excludeVariables.forEach(variable => excludeVariablesArray.push({ label: variable, value: variable }));

        return (<div className={[classes.section, classes.inputsDiv].join(' ')}>
            <div className={classes.sectionTitle}>{translate('TITLE_WORKFLOW_VARIABLES')}</div>
            <div className={classes.sectionBody}>
                <div className="pure-g block">
                    <label className={this.props.classes.label}>
                        <CenteredContent>
                            <span>{translate('LABEL_INCLUDE_VARIABLES')}:</span>
                        </CenteredContent>
                    </label>
                    <div className="pure-u-3-4">
                        <Creatable
                            className={`${editorStyles.normalSelect} native-key-bindings`}
                            inputProps={{className: this.props.classes.selectInput}}
                            shouldKeyDownEventCreateNewOption={this.shouldKeyDownEventCreateNewOption}
                            multi={true}
                            clearable={true}
                            placeholder={translate('PLACEHOLDER_VARIABLES')}
                            noResultsText={translate('INSTRUCTION_INCLUDE_VARIABLES')}
                            promptTextCreator={this.promptTextCreator}
                            value={includeVariablesArray} 
                            onChange={p => this.add(p, 'includeVariables')} />
                    </div>
                </div>
                <div className="pure-g block">
                    <label className={this.props.classes.label}>
                        <CenteredContent>
                            <span>{translate('LABEL_EXCLUDE_VARIABLES')}:</span>
                        </CenteredContent>
                    </label>
                    <div className="pure-u-3-4">
                        <Creatable
                            className={`${editorStyles.normalSelect} native-key-bindings`}
                            inputProps={{className: this.props.classes.selectInput}}
                            shouldKeyDownEventCreateNewOption={this.shouldKeyDownEventCreateNewOption}
                            multi={true}
                            clearable={true}
                            placeholder={translate('PLACEHOLDER_VARIABLES')}
                            noResultsText={translate('INSTRUCTION_EXCLUDE_VARIABLES')}
                            promptTextCreator={this.promptTextCreator}
                            value={excludeVariablesArray} 
                            onChange={p => this.add(p, 'excludeVariables')} />
                    </div>
                </div>
            </div>
        </div>);
    }
}


//const Text = require('react-icons/lib/fa/font');
//const File = require('react-icons/lib/fa/file-text-o');
//const Remove = require('react-icons/lib/fa/times-circle');
//import { Options } from '../options';
//import { observable, computed } from 'mobx';
