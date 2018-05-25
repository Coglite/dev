export interface Disposable {
    dispose: () => void;
};

export type CustomInputFactory<T> = (el: HTMLElement, initialContent?: T) => CustomInputIO<T>;

export class CustomInputIO<T = string> {
    element: HTMLElement;
    private _onChange: (callback: Function) => Disposable;
    public getValue: () => T;
    public setValue: (value: T) => void;
    public IO: any;

    private listeners: Disposable[] = [];

    constructor (element: HTMLElement, onChange: (callback: Function) => Disposable) {
        this.element = element;
        this._onChange = onChange;
    }

    public onChange = (callback: Function) => {
        let listener = this._onChange(callback);
        this.listeners.push(listener);

        return listener;
    }

    public dispose () {
        for (var i = 0; i < this.listeners.length; i++) {
            this.listeners[i].dispose();
        }
    }
}