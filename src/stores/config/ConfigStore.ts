/**
 * Stores config meta
 */
import { action, observable } from 'mobx';

import {
    changeKit,
    createNewFile,
    deleteProjectFile,
    initialize,
    installComponentKit,
    installModule,
    onComponentKit,
    onComponentKitInfo,
    onFileRead,
    onInitialConfig,
    onMessage,
    onPackageInfo,
    onProjectFileInfo,
    onProjectFileRead,
    onWebpackDetail,
    readProjectFile,
    uninstallComponentKit,
    uninstallModule,
    writeCode,
} from '../../../lib/middleMan/client';
import {editorSessionStore} from '../EditorSessionStore';
import {workspaceStore} from '../WorkspaceStore';
import {ComponentKitConfig} from './ComponentKitConfig';


interface INotification {
    notificationType: 'success' | 'error';
    message: string;
}

export class ConfigStore {
    @observable public installedComponentKits: ComponentKitConfig[];
    @observable public activeComponentKit: ComponentKitConfig;
    @observable public notification: INotification;
    @observable public isInProgress: boolean;
    @observable public componentKitInfo: {
        installedKits: {
            name: string;
            label: string;
            version: string;
        }[],
        uninstalledKits: {
            name: string;
            label: string;
        }[]
    };
    @observable public webpackPort: number;

    constructor() {
        this.installedComponentKits = observable([]);
        this.activeComponentKit = new ComponentKitConfig('', '', '');
        this.isInProgress = false;
        this.webpackPort = 0;
        this.notification = {
            notificationType: 'success',
            message: ''
        };
        this.componentKitInfo = {
            installedKits: [],
            uninstalledKits: []
        };
        initialize('http://localhost:3000');
        onInitialConfig((data) => {
            this.installedComponentKits = [];
            for (const kit of data.installedComponentKits) {
                this.installedComponentKits.push(new ComponentKitConfig(kit.name, kit.label, kit.version));
            }
            this.activeComponentKit = this.getComponentKitByKey(data.activeComponentKit);
        });

        onComponentKit((data) => {
            editorSessionStore.componentKit.setComponentKit(data);
        });

        onProjectFileRead((code) => {
            editorSessionStore.updateCode(code.content);
            workspaceStore.setActiveFile(code.fileName);
        });

        onMessage((message) => {
            this.isInProgress = false;
            this.notification.message = message.message;
            this.notification.notificationType = message.messageType;
        });

        onPackageInfo((dependencies) => {
            if (dependencies === null) {
                return null;
            }

            const deps = [];
            Object.keys(dependencies.dependencies).forEach((key) => {
                deps.push({
                    name: key,
                    version: dependencies.dependencies[key]
                });
            });

            const devDeps = [];
            Object.keys(dependencies.devDependencies).forEach((key) => {
                deps.push({
                    name: key,
                    version: dependencies.devDependencies[key]
                });
            });

            editorSessionStore.setDependencies(deps, devDeps);
        });

        onComponentKitInfo((data) => {
            this.componentKitInfo.installedKits = data.installedKits;
            this.componentKitInfo.uninstalledKits = data.uninstalledKits;
        });

        onProjectFileInfo((data) => {
            workspaceStore.setFiles(data.files);
            workspaceStore.setEntryFile(data.entryFile);
        });

        onFileRead((content) => {
            editorSessionStore.setInitialContent(content.content);
            workspaceStore.setActiveFile(content.fileName);
        });

        onWebpackDetail((port) => {
            this.webpackPort = port;
        });
    }

    @action
    public setActiveComponentKit = (componentKitKey: string) => {
        this.activeComponentKit = this.getComponentKitByKey(componentKitKey);
        changeKit(componentKitKey);
    }

    @action
    public writeCode = (content: string) => {
        writeCode({
            fileName: workspaceStore.activeFile,
            content
        });
        editorSessionStore.setSavedCode();
    }

    @action
    public installModule = (name: string) => {
        this.isInProgress = true;
        installModule(name);
    }

    @action
    public uninstallModule = (name: string) => {
        this.isInProgress = true;
        uninstallModule(name);
    }

    @action
    public installComponentKit = (name: string) => {
        this.isInProgress = true;
        installComponentKit(name);
    }

    @action
    public uninstallComponentKit = (name: string) => {
        this.isInProgress = true;
        uninstallComponentKit(name);
    }

    @action
    public createFile = (name: string) => {
        if (workspaceStore.isFileValid(name)) {
            createNewFile(name);
        } else {
            this.notification = {
                message: 'There is already a file exists with that name.',
                notificationType: 'error'
            };
        }
    }

    @action
    public readProjectFile = (name: string) => {
        readProjectFile(name);
    }

    @action
    public deleteProfileFile = (file: string) => {
        deleteProjectFile(file);
        readProjectFile(name);
    }

    @action
    private getComponentKitByKey = (componentKey: string) => {
        for (const kit of this.installedComponentKits) {
            if (kit.name === componentKey) {
                return kit;
            }
        }
    }
}

export const configStore = new ConfigStore();
