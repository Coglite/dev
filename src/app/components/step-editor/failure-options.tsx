import * as React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
let injectSheet = require('react-jss').default;

//import { WorkflowStepSimple } from '../../models/workflow';

import { translate } from '../../services/translation-service';

export interface SourceOptionsProps {
    obj: {ignoreFailure?: boolean, ignoreMissing?: boolean, ignoreValidation?: boolean},
    classes?: any
}

const styles = (theme: any) => ({
});

@injectSheet(styles)
@observer
export class FailureOptions extends React.Component<SourceOptionsProps, {}> {
    constructor(props) {
        super(props);
    }

    private get failureIgnored() {
        return this.props.obj.ignoreFailure === true;
    }

    private get missingIgnored() {
        return this.props.obj.ignoreMissing === true;
    }

    private get validationIgnored() {
        return this.props.obj.ignoreValidation === true;
    }

    @action
    private ignoreFailure(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.obj.ignoreFailure = e.currentTarget.checked;
    }

    @action
    private ignoreMissing(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.obj.ignoreMissing = e.currentTarget.checked;
    }

    @action
    private ignoreValidation(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.obj.ignoreValidation = e.currentTarget.checked;
    }

    public render() {
        //let classes = this.props.classes || {}
        return (<div>
            <div className="pure-u-1 block">
                <label className="input-label">
                    <input className="input-checkbox" type="checkbox" checked={this.failureIgnored} onChange={e => this.ignoreFailure(e)} />{' '}
                    {translate('OPTION_IGNORE_FAILURE')}
                </label>
            </div>
            <div className="pure-u-1 block">
                <label className="input-label">
                    <input className="input-checkbox" type="checkbox" checked={this.missingIgnored} onChange={e => this.ignoreMissing(e)} />{' '}
                    {translate('OPTION_IGNORE_MISSING')}
                </label>
            </div>
            <div className="pure-u-1">
                <label className="input-label">
                    <input className="input-checkbox" type="checkbox" checked={this.validationIgnored} onChange={e => this.ignoreValidation(e)} />{' '}
                    {translate('OPTION_IGNORE_VALIDATION')}
                </label>
            </div>
        </div>);
    }
}    