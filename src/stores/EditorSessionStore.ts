/**
 * Editor session
 */
import { action, computed, isObservableArray, observable } from 'mobx';

import {
    addImportStatementForComponent,
    extractPropsFromComponent,
    findImportDeclartionOfComponent,
    findNodeInEditorPosition,
    getAllImportDeclarations,
} from '../services/astHelper';
import componentPropsTypes from '../services/componentPropType';
import { Model as BooleanModel } from './../knobs/boolean';
import { Model as DropdownModel } from './../knobs/dropdown';
import { Model as NumberModel } from './../knobs/number';
import { Model as TextModel } from './../knobs/text';
import ComponentMeta, { IComponentExport, IComponentProp } from './ComponentMeta';
import ComponentsKit from './ComponentsKit';



const recast = require('recast');
export interface IEditorSessionComponentProps extends IComponentProp {
    model: any;
}

interface IDependency {
    name: string;
    version: string;
}

export interface IPackageDependency {
    devDependencies: IDependency[];
    dependencies: IDependency[];
}

export class EditorSession {
    @observable public code: string;
    public ast: any;
    @observable public highlightedNode: any;
    @observable public highlightedNodeParent: any;
    @observable public componentKit: ComponentsKit;
    public importDeclarations: any[];
    @observable public componentsMeta: ComponentMeta;
    @observable public componentNode: any;
    @observable public cursorPosion: any;
    @observable public props: IEditorSessionComponentProps[];
    @observable public componentSearchText: string;
    @observable public dependencies: IPackageDependency;
    @observable public lastSavedCode: string;

    constructor() {
        this.componentKit = new ComponentsKit();
        this.code = '';
        this.lastSavedCode = '';
        this.lastSavedCode = '';
        this.importDeclarations = [];
        this.highlightedNode = null;
        this.componentsMeta = null;
        this.props = [];
        this.cursorPosion = null;
        this.componentSearchText = '';
        this.dependencies = {
            devDependencies: [],
            dependencies: []
        };
    }

    @action
    public updateCode = (code: string) => {
        this.code = code;
        this.generateAst();
    }

    @action
    public setCode = (code: string, position: { row: number, column: number }) => {
        this.cursorPosion = position;
        this.code = code;
        this.generateAst();
        this.updatePropsModelWithNewValues();
        this.findNode(this.cursorPosion);
    }

    @action
    public addComponent = (id: string) => {
        const component = this.componentKit.getComponentById(id);
        this.addImport(component.exported);
    }

    @action
    public addImport = (componentExport: IComponentExport | IComponentExport[]) => {
        this.generateAst();
        if (isObservableArray(componentExport)) {
            for (const ex of (<IComponentExport[]>componentExport)) {
                addImportStatementForComponent(
                    <IComponentExport>ex,
                    (<IComponentExport>ex).moduleName,
                    this.ast
                );
            }
        } else {
            addImportStatementForComponent(
                <IComponentExport>componentExport,
                (<IComponentExport>componentExport).moduleName,
                this.ast
            );
        }
        this.regenerateCode();
    }

    public getComponentSnippet = (componentMeta: ComponentMeta) => {
        return `<${componentMeta.name} />`;
    }

    @action
    public findNode = (position: { row: number, column: number }) => {
        this.generateAst();
        const nodeInPositionWithParent = findNodeInEditorPosition(position, this.ast);
        this.highlightedNode = nodeInPositionWithParent.node;
        this.highlightedNodeParent = nodeInPositionWithParent.parentNode;
        this.componentNode = nodeInPositionWithParent.componentNode;
        console.log('Current Component ' + this.componentNode);
        this.importDeclarations = getAllImportDeclarations(this.ast);
        const declaration = findImportDeclartionOfComponent(
            this.highlightedNode,
            this.highlightedNodeParent,
            this.importDeclarations
        );

        if (declaration) {
            const componentMeta = this.componentKit.getComponentMeta(declaration);
            this.componentsMeta = componentMeta;
        }

        this.buildMetaPropsWithModel();
        this.updatePropsModelWithNewValues();
    }

    @action
    public buildMetaPropsWithModel = () => {
        if (!this.componentsMeta) {
            return;
        }

        this.props = [];
        for (const prop of this.componentsMeta.props) {
            let model = null;

            if (prop.propType === componentPropsTypes.string) {
                model = new TextModel(prop.name, this.componentNode);
            } else if (prop.propType === componentPropsTypes.boolean) {
                model = new BooleanModel(prop.name, this.componentNode);
            } else if (prop.propType === componentPropsTypes.number) {
                model = new NumberModel(prop.name, this.componentNode);
            } else if (prop.propType === componentPropsTypes.options) {
                model = new DropdownModel(prop.name, this.componentNode, prop.options);
            }

            const propWithModel = {
                name: prop.name,
                propType: prop.propType,
                defaultValue: prop.defaultValue,
                required: prop.required,
                description: prop.description,
                model
            };

            this.props.push(propWithModel);
        }
    }

    @action
    public updatePropsModelWithNewValues = () => {
        const updatedProps = extractPropsFromComponent(this.componentNode);
        Object.keys(updatedProps).forEach((key) => {
            for (const modelProps of this.props) {
                if (modelProps.name === key) {
                    modelProps.model.setValue(updatedProps[key]);
                }
            }
        });
    }

    @action
    public regenerateCode = () => {
        this.code = recast.prettyPrint(this.ast, { tabWidth: 2 }).code;
    }

    @action
    public generateAst = () => {
        try {
            this.ast = recast.parse(this.code, {
                tolerant: false, jsx: true, range: true
            });
        } catch (e) {
            console.log('Error in syntax');
        }
    }

    @computed
    public get filteredComponent() {
        const myRegExp = new RegExp(this.componentSearchText, 'i');
        return this.componentKit.components.filter((component) => {
            return myRegExp.test(component.name);
        });
    }

    @action
    public setFitlerText = (text: string) => {
        this.componentSearchText = text;
    }

    @action
    public setDependencies = (dependencies: IDependency[], devDependencies: IDependency[]) => {
        this.dependencies = {
            dependencies,
            devDependencies
        };
    }

    @action
    public setSavedCode = () => {
        this.lastSavedCode = this.code;
    }

    @action
    public restoreLastSavedCode = () => {
        this.code = this.lastSavedCode;
    }

    @action
    public setInitialContent = (content: string) => {
        this.code = content;
        this.lastSavedCode = content;
    }

    @computed
    public get IsDirty() {
        console.log(this.lastSavedCode + ' ' + this.code);
        return this.lastSavedCode !== this.code;
    }
}

export const editorSessionStore = new EditorSession();
