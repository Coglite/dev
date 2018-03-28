/** AST node manipulator for text*/
import { addOrUpdatePropertyOfReactComponent, getReactComponentAttributeValue } from '../../services/astHelper';
import componentPropType from '../../services/componentPropType';
import {DropdownKnobModel} from './DropdownModel';


export default function(model: DropdownKnobModel, node) {
    node.value.expression.value = model.selectedOption;
}

export function getInitialValue(node, propName) {
    return getReactComponentAttributeValue(node, propName, componentPropType.string);
}

export function update(propName: string, value: any, node: any) {
    addOrUpdatePropertyOfReactComponent(node, propName, value, componentPropType.string);
}
