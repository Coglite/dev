/**
 * AST node manipulator for text
 */
import { addOrUpdatePropertyOfReactComponent, getReactComponentAttributeValue } from '../../services/astHelper';
import componentPropType from '../../services/componentPropType';
import TextKnobModel from './NumberModel';


export default function(model: TextKnobModel, node) {
    node.value = model.value;
}

export function getInitialValue(node, propName) {
    return getReactComponentAttributeValue(node, propName, componentPropType.number);
}

export function update(propName: string, value: number, node: any) {
    addOrUpdatePropertyOfReactComponent(node, propName, value, componentPropType.number);
}
