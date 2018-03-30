import { observer } from 'mobx-react';
import * as React from 'react';

import { NumberKnobModel } from './NumberModel';



interface INumberKnobProp {
    model: NumberKnobModel;
    onChange: (model: NumberKnobModel) =>  void;
}

@observer
export class NumberKnob extends React.Component<INumberKnobProp, {}> {
    public handleChange = (e) => {
        this.props.model.setText(Number(e.target.value));
        this.props.onChange(this.props.model);
    }
    public render() {
        return (
            <input
                className='pt-input .modifier'
                type='text'
                placeholder='Text input'
                dir='auto'
                value={this.props.model.value || ''}
                onChange={this.handleChange}
            />
        );
    }
}
