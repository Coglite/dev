import * as React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
let injectSheet = require('react-jss').default;

import { WorkflowStepSimple } from '../../models/workflow';
import { SourceOptions } from './source-options';
import { FailureOptions } from './failure-options';
import { VariablesEditor } from './variables-editor';
import { VolumeOptions } from './volume-options';
import { HealthOptions } from './health-options';
import { DropDownMenu, Item } from '../drop-down-menu';
import { translate } from '../../services/translation-service';
import { sectionStyles } from '../../style';
import { InfoTooltip } from '../../components/tooltip';
import { SfLinkFactory } from '../../models/state';
import { variableEditorFactory, variableSourceFactory } from '../../components/step-editor/variable-editor';
import { portEntrySourceFactory, portEditorFactory } from '../../components/step-editor/port-editor';

//const InfoCircle = require('react-icons/lib/fa/info-circle');
//import { StepTransientState } from '../../models/workflow';


export interface AdvancedOptionsProps {
    step: WorkflowStepSimple,
    ide: boolean,
    sfLinkFactory: SfLinkFactory,
    classes?: any
}

const styles = (theme: any) => {
    let section = sectionStyles(theme);

    return Object.assign({
        advanced: {
            composes: 'pure-u-1 block',
            marginTop: '16px'
        },
        link: {
            color: '#4E73BD',
            fontWeight: '700',
            textDecoration: 'none',
            '&:hover': {
                color: '#34518b',
                textDecoration: 'none'
            },
            '&:visited': {
                textDecoration: 'none'
            }
        }
    }, section);
};

@injectSheet(styles)
@observer
export class AdvancedOptions extends React.Component<AdvancedOptionsProps, {}> {
    constructor(props: AdvancedOptionsProps) {
        super(props);
    }

    @action
    private setup (props: AdvancedOptionsProps) {
        props.step.transient.healthConfigured = props.step.health.filled();
    }

    componentWillMount () {
        this.setup(this.props);
    }

    componentWillReceiveProps (newProps: AdvancedOptionsProps) {
        this.setup(newProps);
    }

    private get transient() {
        return this.props.step.transient;
    }

    private get healthConfigured() {
        if (this.transient.healthConfigured) {
            return true;
        }

        if (this.props.step.health) {
            return this.props.step.health.filled();
        }

        return false;
    }

    private get readinessConfigured() {
        if (this.transient.readinessConfigured) {
            return true;
        }

        if (this.props.step.readiness) {
            return this.props.step.readiness.filled();
        }

        return false;
    }

    private get environmentConfigured() {
        if (this.transient.environmentConfigured) {
            return true;
        }

        return this.props.step.environment && this.props.step.environment.length > 0;
    }

    private get volumesConfigured() {
        if (this.transient.volumesConfigured) {
            return true;
        }

        return this.props.step.volumes && this.props.step.volumes.length > 0;
    }

    private get portsConfigured() {
        if (this.transient.portsConfigured) {
            return true;
        }

        return this.props.step.ports && this.props.step.ports.length > 0;
    }

    private get sourceOptions() {
        if (this.transient.sourceOptions) {
            return true;
        }

        return this.props.step.omitSource ||
            (this.props.step.sourceLocation && this.props.step.sourceLocation.length > 0 &&
                this.props.step.sourceLocation !== '/app');
    }

    private get failureOptions() {
        if (this.transient.failureOptions) {
            return true;
        }

        return this.props.step.ignoreFailure || this.props.step.ignoreMissing || this.props.step.ignoreValidation;
    }

    private section(title: string, body: JSX.Element, helpMessage?:JSX.Element) {
        const classes = this.props.classes || {};
        return (<div className={classes.section}>
            <div className={classes.sectionTitle}>
                {title}
                {helpMessage && <InfoTooltip className={classes.sectionTooltip}>{helpMessage}</InfoTooltip>}
            </div>
            <div className={classes.sectionBody}>
                {body}
            </div>
        </div>)
    }

    @action
    private runAction(action: () => void) {
        action();
    }

    private button(label: string, handler: () => void): Item {
        return {
            display: <span>{label}</span>,
            onClick: () => this.runAction(handler)
        }
    }

    get additionalAdvancedOptionsAvailable() {
        return !this.sourceOptions ||
            !this.failureOptions ||
            !this.healthConfigured ||
            !this.readinessConfigured ||
            !this.environmentConfigured ||
            !this.volumesConfigured ||
            !this.portsConfigured;
    }

    private generateOptionItems () {
        let items: Item[] = [];
        
        if (this.props.step.type === 'service') {
            if (!this.healthConfigured) {
                items.push(this.button(
                    translate('CONFIGURE_HEALTH'),
                    () => this.transient.healthConfigured = true));
            }

            if (!this.readinessConfigured) {
                items.push(this.button(
                    translate('CONFIGURE_READINESS'),
                    () => this.transient.readinessConfigured = true));
            }
        }

        if (!this.environmentConfigured) {
            items.push(this.button(
                translate('CONFIGURE_ENVIRONMENT'),
                () => this.transient.environmentConfigured = true));
        }

        if (!this.portsConfigured) {
            items.push(this.button(
                translate('CONFIGURE_PORTS'),
                () => this.transient.portsConfigured = true));
        }

        if (!this.volumesConfigured) {
            items.push(this.button(
                translate('CONFIGURE_VOLUMES'),
                () => this.transient.volumesConfigured = true));
        }

        if (!this.sourceOptions) {
            items.push(this.button(
                translate('CONFIGURE_SOURCE'),
                () => this.transient.sourceOptions = true));
        }

        if (!this.failureOptions) {
            items.push(this.button(
                translate('CONFIGURE_FAILURE'),
                () => this.transient.failureOptions = true));
        }

        return items;
    }

    public render() {
        let step = this.props.step;
        const classes = this.props.classes || {};
        let items = this.generateOptionItems();

        return (<div className={classes.advanced}>
            {step.type === 'service' && this.healthConfigured &&
                this.section(
                    translate('TITLE_HEALTH'),
                    <HealthOptions step={step} ide={this.props.ide} />,
                    <div>
                        {translate('HELP_HEALTH_TEXT')}
                        <br /><br />
                        {this.props.sfLinkFactory("/docs/workflows#health", translate('HELP_HEALTH_LINK'))}
                    </div>)}
            {step.type === 'service' && this.readinessConfigured &&
                this.section(
                    translate('TITLE_READINESS'), 
                    <HealthOptions typeField="readinessCheckType" field="readiness" step={step} ide={this.props.ide} />,
                    <div>
                        {translate('HELP_READINESS_TEXT')}
                        <br /><br />
                        {this.props.sfLinkFactory("/docs/workflows#readiness", translate('HELP_READINESS_LINK'))}
                    </div>)}
            {this.sourceOptions &&
                this.section(
                    translate('TITLE_SOURCE'), 
                    <SourceOptions step={step} ide={this.props.ide} />,
                    <div>
                        {translate('HELP_SOURCE_TEXT')}
                        <br /><br />
                        {this.props.sfLinkFactory("/docs/workflows#source", translate('HELP_SOURCE_LINK'))}
                    </div>)}
            {this.failureOptions &&
                this.section(
                    translate('TITLE_FAILURE'), 
                    <FailureOptions obj={step} />,
                    <div>
                        {translate('HELP_FAILURE_TEXT')}
                        <br /><br />
                        {this.props.sfLinkFactory("/docs/workflows#failure", translate('HELP_FAILURE_LINK'))}
                    </div>)}
            {this.environmentConfigured &&
                this.section(
                    translate('TITLE_ENVIRONMENT'), 
                    <VariablesEditor 
                        variables={step.environment} 
                        ide={this.props.ide} 
                        sourceEditorFactory={variableEditorFactory} 
                        sourceFactory={variableSourceFactory} />,
                    <div>
                        {translate('HELP_ENVIRONMENT_TEXT')}
                        <br /><br />
                        {this.props.sfLinkFactory("/docs/workflows#environment", translate('HELP_ENVIRONMENT_LINK'))}
                    </div>)}
            {this.volumesConfigured &&
                this.section(
                    translate('TITLE_VOLUMES'), 
                    <VolumeOptions step={step} ide={this.props.ide} />,
                    <div>
                        {translate('HELP_VOLUMES_TEXT')}
                        <br /><br />
                        {this.props.sfLinkFactory("/docs/workflows#volumes", translate('HELP_VOLUMES_LINK'))}
                    </div>)}
            {this.portsConfigured &&
                this.section(
                    translate('TITLE_PORTS'), 
                    <VariablesEditor 
                        variables={step.ports} 
                        onlyPairs={true}
                        ide={this.props.ide} 
                        sourceEditorFactory={portEditorFactory} 
                        sourceFactory={portEntrySourceFactory} />,
                    <div>
                        {translate('HELP_PORTS_TEXT')}
                        <br /><br />
                        {this.props.sfLinkFactory("/docs/workflows#ports", translate('HELP_PORTS_LINK'))}
                    </div>)}

            {items.length > 0 &&
                <DropDownMenu
                    ide={this.props.ide}
                    label={translate('CONFIGURE')}
                    items={items} />}
        </div>);
    }
}
