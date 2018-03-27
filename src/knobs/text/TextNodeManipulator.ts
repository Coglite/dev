/**
 * AST node manipulator for text
 */
import { addOrUpdatePropertyOfReactComponent, getReactComponentAttributeValue } from '../../services/astHelper';
import componentPropType from '../../services/componentPropType';
import TextKnobModel from './TextModel';


export default function(model: TextKnobModel, node) {
    node.value = model.text;
}

export function getInitialValue(node, propName) {
    return getReactComponentAttributeValue(node, propName, componentPropType.string);
}

export function update(propName: string, value: string, node: any) {
    addOrUpdatePropertyOfReactComponent(node, propName, value, componentPropType.string);
}
