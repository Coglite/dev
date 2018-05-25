import { observable } from "mobx";

export type ValidatorFn<T> = (val: T) => string[] | void;

export class Field<T = any> {
    @observable originalRef: string;
    @observable originalVal: T;
    @observable fieldVal: T;

    private _validator: ValidatorFn<T>;
    
    private _errors: string[] = [];

    get valid () {
        return this._errors && this._errors.length === 0;
    }

    get errors (): string[] {
        return this._errors;
    }

    updateValue (value: T) {
        this.fieldVal = value;
        this.validate();
    }

    validate () {
        if (this._validator) {
            this._errors = this._validator(this.fieldVal) || [];
        }
    }

    constructor (originalRef: string, validator?: ValidatorFn<T>) {
        this.originalRef = originalRef;
        this._validator = validator;
        this._errors = [];
    }
}