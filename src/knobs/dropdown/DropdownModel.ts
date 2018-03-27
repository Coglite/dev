/**
 * Dropdown prop model
 */
import { action, observable } from 'mobx';

import { getInitialValue, update } from './DropdownNodeManipulator';


export default class BooleanKonb {
    @observable public options: {
        label: string;
        value: string;
    }[];
    @observable public selectedOption: string;
    public node: any;
    public propName: string;

    constructor(propName, node, options) {
        this.selectedOption = getInitialValue(node, propName);
        this.propName = propName;
        this.node = node;
        this.options = options;
    }

    @action
    public setValue = (value: any) => {
        this.selectedOption = value;
        update(this.propName, this.selectedOption, this.node);
    }
}
