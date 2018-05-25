import * as React from 'react';
let injectSheet = require('react-jss').default;
import { action } from 'mobx';
import { observer } from 'mobx-react';

//import { observable, computed } from 'mobx';
//const Text = require('react-icons/lib/fa/font');
//const File = require('react-icons/lib/fa/file-text-o');
//const Remove = require('react-icons/lib/fa/times-circle');
//import { editorStyles } from '../../style';
//import { Creatable, Option, OptionValues } from 'react-select';


import { Options } from '../options';
import { WorkflowStepSimple, Health, Readiness } from '../../models/workflow';
import { CenteredContent } from '../../util/centered-content'
import { translate } from '../../services/translation-service';

import { HealthType, HealthTypes } from "../../models/workflow";
import { VariablesEditor } from '../../components/step-editor/variables-editor';
import { variableEditorFactory, variableSourceFactory } from '../../components/step-editor/variable-editor';

export interface HealthOptionsProps {
    step: WorkflowStepSimple;
    field?: string;
    typeField?: string;
    ide: boolean;
    classes?: any;
}

const styles = (theme: any) => ({
    labelContainer: {
        textAlign: 'right'
    },
    smallLabelContainer: {
        composes: '$labelContainer pure-u-1-6'
    },
    largeLabelContainer: {
        composes: '$labelContainer pure-u-5-6'
    },
    healthNumberPropDiv: {
        composes: 'pure-u-1 pure-u-lg-1-2 block'
    },
    healthNumberPropFieldDiv: {
        composes: 'pure-u-1-6'
    },
    healthNumberPropField : {
        composes: 'pure-input-1 input-text native-key-bindings'
    },
    headersTitle : {
        composes: theme.ide? 'tab-border' : '',
        marginTop: '0px',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        paddingBottom: '5px',
        fontSize: '1em'
    },
    label: {
        paddingRight: '5px'
    }
});

@injectSheet(styles)
@observer
export class HealthOptions extends React.Component<HealthOptionsProps, {}> {
    constructor(props: HealthOptionsProps) {
        super(props);
    }

    private get typeField() {
        let field = this.props.typeField || 'healthCheckType';
        return (this.props.step.transient as any)[field] as HealthType;
    }

    private get healthField(): Health | Readiness {
        let field = this.props.field || 'health';
        if ((this.props.step as any)[field].skipWait !== undefined) {
            return (this.props.step as any)[field] as Readiness;
        }
        else {
            return (this.props.step as any)[field] as Health;
        }
    }

    private get isReadiness(): boolean {
        return (this.healthField as any).skipWait !== undefined;
    }

    private get currentHealthCheckType() {
        if (this.props.step) {
            if (this.typeField) {
                return this.typeField;
            } else if (this.healthField && this.healthField.type) {
                return this.healthField.type;
            }
            
        }

        return 'script';
    }

    @action
    private setHealthCheckType(checkType: HealthType) {
        let field = this.props.typeField || 'healthCheckType';
        (this.props.step.transient as any)[field] = checkType;
    }

    private healthCheckTypes() {
        return HealthTypes.map(type => ({
            value: type,
            display: (<span>{translate('OPTION_' + type.toUpperCase())}</span>)
        }));
    }

    private scriptTypeEditor() {
        let classes = this.props.classes || {};
        return (<div className="pure-g">
            <label className={classes.smallLabelContainer}>
                <CenteredContent>
                    <span className={classes.label}>{translate('LABEL_SCRIPT')}:</span>
                </CenteredContent>
            </label>
            <div className="pure-u-5-6">
                <input className="pure-input-1 input-text native-key-bindings"
                    
                    type="text"
                    value={this.healthField.script || ""}
                    onChange={e => this.setHealthCheckProperty(
                        () => this.healthField.script = e.target.value)} />
            </div>
        </div>);
    }

    private requestTypeEditor(checkType: HealthType) {
        let classes = this.props.classes || {};
        return (<div className="pure-g">
            <label className={classes.smallLabelContainer}>
                <CenteredContent>
                    <span className={classes.label}>{translate('LABEL_PORT')}:</span>
                </CenteredContent>
            </label>
            <div className={checkType === "tcp" ? "pure-u-5-6" : "pure-u-1-3"}>
                <input className="pure-input-1 input-text native-key-bindings"
                    
                    type="text"
                    value={this.healthField.port || ""}
                    onChange={e => this.setHealthCheckProperty(
                        () => this.healthField.port = e.target.value)} />
            </div>
            {checkType !== "tcp" &&
                (<label className={classes.smallLabelContainer}>
                    <CenteredContent>
                        <span className={classes.label}>{translate('LABEL_PATH')}:</span>
                    </CenteredContent>
                </label>)}
            {checkType !== "tcp" &&
                (<div className="pure-u-1-3">
                    <input className="pure-input-1 input-text native-key-bindings"
                    
                    type="text"
                    value={this.healthField.path}
                    onChange={e => this.setHealthCheckProperty(
                        () => this.healthField.path = e.target.value)} />
                </div>)}
        </div>);
    }

    private selectedEditor() {
        //let classes = this.props.classes || {};
        let type = this.currentHealthCheckType;
        return (<div className="pure-u-1 block" >
            {type && (type === 'script' ? this.scriptTypeEditor() : this.requestTypeEditor(type))}
        </div >);
    }

    @action
    private setHealthCheckProperty(setter: () => void) {
        setter();
    }
    
    @action
    private toggleSkipWait(e: React.ChangeEvent<HTMLInputElement>) {
        (this.healthField as Readiness).skipWait = e.currentTarget.checked;
    }

    private get skipWait() {
        return (this.healthField as Readiness).skipWait === true;
    }

    private healthCheckNumberProperty(property: string) {
        let classes = this.props.classes || {};

//@ts-ignore
        let onNumberChange = (property: string, e: React.ChangeEvent<HTMLInputElement>) => {
            this.setHealthCheckProperty(() => {
                let value = parseInt(e.target.value);
                if (!isNaN(value)) {
                    //@ts-ignore
                    let stringVal = value;
                    (this.healthField as any)[property] = value
                }
                
            })
        }

        return (<div className={classes.healthNumberPropDiv}>
            <div className="pure-g">
                <label className={classes.largeLabelContainer}>
                    <CenteredContent>
                        <span className={classes.label}>{translate('LABEL_' + property.toUpperCase())}:</span>
                    </CenteredContent>
                </label>
                <div className={classes.healthNumberPropFieldDiv}>
                    <input
                        type="text"
                        className={classes.healthNumberPropField}
                        value={(this.healthField as any)[property] || ""}
                        onChange={e => this.setHealthCheckProperty(
                            () => (this.healthField as any)[property] = parseInt(e.target.value))} />
                </div>
            </div>
        </div>);
    }

    public render() {
        let classes = this.props.classes || {};
        return (<div className="pure-g">
            <div className="pure-u-1 block">
                <Options
                    ide={this.props.ide}
                    fill={true}
                    options={this.healthCheckTypes()}
                    onChange={a => this.setHealthCheckType(a.value)}
                    selected={this.currentHealthCheckType} />
            </div>
            {this.isReadiness && 
                (<div className="pure-u-1 block">
                    <label className="input-label">
                        <input className="input-checkbox" 
                            type="checkbox" 
                            checked={this.skipWait} 
                            onChange={e => this.toggleSkipWait(e)} />{' '}
                            {translate('OPTION_SKIP_WAIT')}
                    </label>
                </div>)
            }
            {this.selectedEditor()}
            {this.healthCheckNumberProperty('interval')}
            {this.healthCheckNumberProperty('retries')}
            {this.healthCheckNumberProperty('timeout')}
            {this.healthCheckNumberProperty('grace')}
            {(this.currentHealthCheckType === 'http' || this.currentHealthCheckType === 'https') && 
                <div className="pure-u-1 block">
                    <h3 className={classes.headersTitle}>Headers</h3>
                    <VariablesEditor 
                        variables={(this.healthField as any).headers} 
                        ide={this.props.ide} onlyPairs={true}
                        sourceEditorFactory={variableEditorFactory} 
                        sourceFactory={variableSourceFactory} />   
                </div>}
        </div>);
    }
}
