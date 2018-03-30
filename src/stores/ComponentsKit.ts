import { action, IObservableArray, observable } from 'mobx';

import { IImportStatement } from '../services/astHelper';
import {ComponentMeta} from './ComponentMeta';



export class ComponentsKit {
    
    @observable public name: string;
    @observable public components: IObservableArray<ComponentMeta>;

    constructor() {
        this.name = 'react-toolbox';
        this.components = observable([]);
    }

    @action
    public getComponentById = (id: string) => {
        for (const component of this.components) {
            if (component.id === id) {
                return component;
            }
        }
    }

    @action
    public setComponentKit = (details: any) => {
         this.components = observable(<any[]>details.components);
    }

    public getComponentMeta = (importStatementMeta: IImportStatement) => {
        for (const compoMeta of this.components) {
            const exportType = importStatementMeta.isDefault ? 'default' : 'named';
            if (
                compoMeta.exported && compoMeta.exported.identifier === importStatementMeta.componentName
                && compoMeta.exported &&compoMeta.exported.exportType === exportType
            ) {
                return compoMeta;
            }
        }
    }
}
