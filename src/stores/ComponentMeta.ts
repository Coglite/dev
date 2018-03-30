import { observable } from 'mobx';



export interface IComponentExport {
    exportType: string;
    identifier: string;
    moduleName: string;
}

export interface IComponentProp {
    name: string;
    propType: string;
    defaultValue: string | boolean;
    required?: boolean;
    options?: {
        label: string;
        value: string;
    }[];
    description?: string;
}


export class ComponentMeta {
    @observable public id: string;
    @observable public name: string;
    @observable public description: string;
    @observable public props: IComponentProp[];
    @observable public exported: IComponentExport;
    @observable public snippet?: string;
    @observable public children?: ComponentMeta[];
    @observable public documentationUrl?: string;
    @observable public isVisibleInComponentPanel: boolean;

    constructor() {
        this.props = [];
        this.children = [];
    }
}
