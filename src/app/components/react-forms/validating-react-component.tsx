import * as React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { Field, ValidatorFn } from "./field";
import { observable } from "mobx";

@observer
export class FormReactComponent<P = {}, S = {}> extends React.Component<P, S> {
    @observable
    private _fields: any[] = [];

    protected componentWillReact () {}

    @action
    private refreshFields () {
        for (var i = 0; i < this._fields.length; i++) {
            this.refreshField(this._fields[i]);
        }
    }

    private refreshField (field: Field, force: boolean = false) {
        let newVal = getProp(this, field.originalRef);

        if (force || newVal !== field.originalVal) {
            field.originalVal = field.fieldVal = newVal;
        }
        
        field.validate();
    }

    constructor(p?: P, s?: S) {
        super(p, s);

        let componentWillReact = this.componentWillReact;

        this.componentWillReact = () => {
            this.refreshFields();
            componentWillReact.apply(this);
        }
    }

    public get fields (): any[] {
        return this._fields;
    }

    public createField<T = any> (originalRef: string, validatorFn: ValidatorFn<T>): Field<T> {
        let field = new Field<T>(originalRef, validatorFn);
        this._fields.push(field);

        this.refreshField(field, true);

        return field;
    }

    public updateField<T> (field: Field<T>, newVal: T) {
        field.updateValue(newVal);
        if (field.valid) {
            setProp(field.fieldVal, this, field.originalRef);
            field.originalVal = field.fieldVal;
        }
    }
}

function getProp (parent: any, accessor: string): any {
    let accessorParts = accessor.split('.');

    for (var i = 0; i < accessorParts.length; i++) {
        if (!parent) {
            return undefined;
        }

        parent = parent[accessorParts[i]];
    }

    return parent;
}

function setProp (value: any, parent: any, accessor: string): void {
    let accessorParts = accessor.split('.');

    for (var i = 0; i < accessorParts.length - 1; i++) {
        if (!parent) {
            return undefined;
        }

        parent = parent[accessorParts[i]];
    }

    parent[accessorParts[accessorParts.length - 1]] = value;
}