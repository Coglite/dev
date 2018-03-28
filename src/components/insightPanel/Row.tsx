/**
 * Property panel row
 */
import { Tooltip } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import * as React from 'react';

import { BooleanKnob } from '../../knobs/boolean';
import { DropdownKnob } from '../../knobs/dropdown';
import { NumberKnob } from '../../knobs/number';
import { TextKnob } from '../../knobs/text';
import componentPropTypes from '../../services/componentPropType';
import { IEditorSessionComponentProps } from '../../stores/EditorSessionStore';



interface IRowProps {
    componentProps: IEditorSessionComponentProps;
    componentNode: any;
    onChange: () => void;
}

@observer
export class Row extends React.Component<IRowProps, {}> {
    public render() {
        let knob = null;

        if (this.props.componentProps.propType === componentPropTypes.string) {
            knob = <TextKnob model={this.props.componentProps.model} onChange={this.props.onChange} />;
        } else if (this.props.componentProps.propType === componentPropTypes.boolean) {
            knob = <BooleanKnob model={this.props.componentProps.model} onChange={this.props.onChange} />;
        } else if (this.props.componentProps.propType === componentPropTypes.number) {
            knob = <NumberKnob model={this.props.componentProps.model} onChange={this.props.onChange} />;
        } else if (this.props.componentProps.propType === componentPropTypes.options) {
            knob = <DropdownKnob model={this.props.componentProps.model} onChange={this.props.onChange} />
        }

        return (
            <tr>
                <td style={{width: '200px'}}>
                    <h6>
                        <Tooltip
                            className='pt-tooltip-indicator'
                            content={<p className='property-description'>{this.props.componentProps.description}</p>}
                        >
                            {this.props.componentProps.name}
                        </Tooltip>
                        {
                            this.props.componentProps.required
                            && <span className='pt-tag pt-minimal pt-intent-success'>Required</span>
                        }
                    </h6>
                </td>
                <td>
                    {knob}
                </td>
            </tr>
        );
    }
}