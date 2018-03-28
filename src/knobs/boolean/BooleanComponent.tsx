/**
 * Boolean component
 */
import { Checkbox } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import * as React from 'react';

import {BooleanKnobModel} from './BooleanModel';


interface IBooleanComponentProps {
    model: BooleanKnobModel;
    onChange: (model: BooleanKnobModel) =>  void;
}

@observer
export class BooleanKnob extends React.Component<IBooleanComponentProps, {}> {
    public onChange = (value) => {
        this.props.model.setValue(value.target.checked);
        this.props.onChange(this.props.model);
    }

    public render() {
        return (
            <Checkbox checked={this.props.model.isTrue} onChange={this.onChange}/>
        );
    }
} 