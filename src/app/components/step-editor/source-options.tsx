import * as React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
let injectSheet = require('react-jss').default;

import { WorkflowStepSimple } from '../../models/workflow';
import { translate } from '../../services/translation-service';
import { CenteredContent } from '../../util/centered-content';
import { Options } from '../options';
import { Creatable, Option, OptionValues } from 'react-select';
import { editorStyles } from '../../style';

export interface SourceOptionsProps {
    step: WorkflowStepSimple;
    ide: boolean;
    classes?: any;
}

const styles = (theme: any) => ({
    label: {
        composes: 'input-label pure-u-1 pure-u-md-1-4 text-right',
        paddingRight: '5px'
    },
    textCenter: {
        textAlign: 'center'
    }
});

@injectSheet(styles)
@observer
export class SourceOptions extends React.Component<SourceOptionsProps, {}> {
    constructor(props: SourceOptionsProps) {
        super(props);
    }

    private get sourceOmitted() {
        return this.props.step.omitSource === true;
    }

    private get sourceTypes () {
        return [
            {
                value: 'noSource',
                display: (<span>{translate('OPTION_NOSOURCE')}</span>)
            },
            {
                value: 'dockerignore',
                display: (<span>{translate('OPTION_DOCKERIGNORE')}</span>)
            },
            {
                value: 'includeExclude',
                display: (<span>{translate('OPTION_INCLUDEEXCLUDE')}</span>)
            },
        ]
    }

    @action
    omitSource(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.step.omitSource = e.currentTarget.checked;
    }

    @action
    private updateDockerignore(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.step.dockerignore = e.target.value;
    }

    @action
    private setSourceType (type: 'dockerignore' | 'includeExclude') {
        this.props.step.transient.sourceType = type;
    }
    
    private get currentSourceType () {
        if (this.props.step.transient.sourceType) {
            return this.props.step.transient.sourceType;
        }

        if (this.sourceOmitted) {
            return 'noSource';
        }

        return ((this.props.step.sourceIncludes || []).length || (this.props.step.sourceExcludes || []).length) ?
            'includeExclude' : 'dockerignore';
    }
    
    shouldKeyDownEventCreateNewOption (arg: { keyCode: number }) {
        return arg.keyCode === 32 || arg.keyCode === 9 || arg.keyCode === 13 || arg.keyCode === 188;
    }
    
    private promptTextCreator = (label: string): string => {
        return translate('LABEL_VARIABLE_PROMPT', label);
    }
    
    @action
    private setSources(variables: Option<OptionValues>, arrayName: 'sourceIncludes' | 'sourceExcludes') {
        if (variables) {
            let newVars: string[] = [];
            for (let i = 0; i < variables.length; i++) {
                newVars.push(variables[i].value);
            }
            this.props.step[arrayName] = newVars;

            if (arrayName === 'sourceIncludes') {
                this.props.step.transient.explicitSourceIncludes = true;
            }
            else {
                this.props.step.transient.explicitSourceExcludes = true;
            }
        }
    }

    public render() {
        let classes = this.props.classes || {};

        let sourceIncludesArray: Option[] = [];
        let sourceExcludesArray: Option[] = [];

        this.props.step.sourceIncludes.forEach(sourceLine => sourceIncludesArray.push({ label: sourceLine, value: sourceLine }));
        this.props.step.sourceExcludes.forEach(sourceLine => sourceExcludesArray.push({ label: sourceLine, value: sourceLine }));

        return (<div>
            {!this.sourceOmitted && (
                <div>
                    <div className="pure-u-1 block">
                        <Options
                            ide={this.props.ide}
                            fill={true}
                            options={this.sourceTypes}
                            onChange={a => this.setSourceType(a.value)}
                            selected={this.currentSourceType} />
                    </div>
                    {this.currentSourceType === 'noSource' && 
                        <div className="pure-g block">
                            <div className="pure-u-1">
                                <div className={classes.textCenter}>
                                    {translate('OPTION_OMIT_SOURCE')}
                                </div>
                            </div>
                        </div>
                    }
                    {this.currentSourceType === 'dockerignore' && 
                        <div className="pure-g">
                            <label className={classes.label}>
                                <CenteredContent>
                                    <span>{translate('LABEL_DOCKERIGNORE')}:</span>
                                </CenteredContent>
                            </label>
                            <div className="pure-u-1 pure-u-md-3-4">
                                <input className='pure-input-1 code input-text native-key-bindings'
                                    type="text"
                                    value={this.props.step.dockerignore || ''}
                                    onChange={e => this.updateDockerignore(e)} />
                            </div>
                        </div>
                    }
                    {this.currentSourceType === 'includeExclude' && 
                        <div>
                            <div className="pure-g block">
                                <label className={this.props.classes.label}>
                                    <CenteredContent>
                                        <span>{translate('LABEL_SOURCE_INCLUDES')}:</span>
                                    </CenteredContent>
                                </label>
                                <div className="pure-u-3-4">
                                    <Creatable
                                        className={`${editorStyles.normalSelect} native-key-bindings`}
                                        inputProps={{className: this.props.classes.selectInput}}
                                        shouldKeyDownEventCreateNewOption={this.shouldKeyDownEventCreateNewOption}
                                        multi={true}
                                        clearable={true}
                                        placeholder={translate('PLACEHOLDER_SOURCE_INCLUDES')}
                                        noResultsText={translate('INSTRUCTION_SOURCE_INCLUDES')}
                                        promptTextCreator={this.promptTextCreator}
                                        value={sourceIncludesArray} 
                                        onChange={p => this.setSources(p, 'sourceIncludes')} />
                                </div>
                            </div>
                            <div className="pure-g block">
                                <label className={this.props.classes.label}>
                                    <CenteredContent>
                                        <span>{translate('LABEL_SOURCE_EXCLUDES')}:</span>
                                    </CenteredContent>
                                </label>
                                <div className="pure-u-3-4">
                                    <Creatable
                                        className={`${editorStyles.normalSelect} native-key-bindings`}
                                        inputProps={{className: this.props.classes.selectInput}}
                                        shouldKeyDownEventCreateNewOption={this.shouldKeyDownEventCreateNewOption}
                                        multi={true}
                                        clearable={true}
                                        placeholder={translate('PLACEHOLDER_SOURCE_EXCLUDES')}
                                        noResultsText={translate('INSTRUCTION_SOURCE_EXCLUDES')}
                                        promptTextCreator={this.promptTextCreator}
                                        value={sourceExcludesArray} 
                                        onChange={p => this.setSources(p, 'sourceExcludes')} />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            )}
        </div>);
    }
}    