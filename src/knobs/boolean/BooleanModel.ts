/**
 * Boolean prop model
 */
import { action, observable } from 'mobx';

import { getInitialValue, update } from './BooleanNodeManipulator';


export class BooleanKnobModel {
    @observable public isTrue: boolean;
    public node: any;
    public propName: string;

    constructor(propName, node) {
        this.isTrue = getInitialValue(node, propName);
        this.propName = propName;
        this.node = node;
    }

    @action
    public setValue = (value: any) => {
        this.isTrue = value;
        update(this.propName, this.isTrue, this.node);
    }
}