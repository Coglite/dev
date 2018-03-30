import { observable } from 'mobx';



export class ComponentKitConfig {
    @observable public name: string;
    @observable public label: string;
    @observable public version: string;

    constructor(name: string, label: string, version: string) {
        this.name = name;
        this.label = label;
        this.version = version;
    }
}
