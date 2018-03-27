/**
 * AST node manipulator for text
 */
import { addOrUpdatePropertyOfReactComponent, getReactComponentAttributeValue } from '../../services/astHelper';
import componentPropType from '../../services/componentPropType';
import BooleanKnobModel from './boolean.model';


export default function(model: BooleanKnobModel, node) {
    node.value.expression.value = model.isTrue;
}

export function getInitialValue(node, propName) {
    return getReactComponentAttributeValue(node, propName, componentPropType.boolean);
}

export function update(propName: string, value: any, node: any) {
    addOrUpdatePropertyOfReactComponent(node, propName, value, componentPropType.boolean);
}
