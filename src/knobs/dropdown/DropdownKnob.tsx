/**
 * Dropdown component
 */
import { observer } from 'mobx-react';
import * as React from 'react';

import {DropdownKnobModel} from './DropdownModel';


interface IDropdownKnobProps {
    model: DropdownKnobModel;
    onChange: (model: DropdownKnobModel) => void;
}

@observer
export class DropdownKnob extends React.Component<IDropdownKnobProps, {}> {
    public handleChange = (e) => {
        if (e.target.value === 'Choose an item...') {
            this.props.model.setValue('');
            this.props.onChange(this.props.model);
        } else {
            this.props.model.setValue(e.target.value);
            this.props.onChange(this.props.model);
        }
    }

    public render() {
        const options = this.props.model.options.map((item) => {
            return (
                <option
                    selected={item.value === this.props.model.selectedOption}
                    value={item.value}
                >
                    {item.label}
                </option>
            );
        });

        return (
            <div className='pt-select'>
                <select onChange={this.handleChange}>
                    <option value={null}>Choose an item...</option>
                    {options}
                </select>
            </div>
        );
    }
}

