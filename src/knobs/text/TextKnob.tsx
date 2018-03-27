/**
 * A text knob
 */
import { observer } from 'mobx-react';
import * as React from 'react';

import Model from './TextModel';


interface ITextKnobProp {
    model: Model;
    onChange: (model: Model) =>  void;
}

@observer
export default class Text extends React.Component<ITextKnobProp, {}> {
    public handleChange = (e) => {
        this.props.model.setText(e.target.value);
        this.props.onChange(this.props.model);
    }
    public render() {
        return (
            <input
                className='pt-input .modifier'
                type='text'
                placeholder='Text input'
                dir='auto'
                value={this.props.model.text || ''}
                onChange={this.handleChange}
            />
        );
    }
}
