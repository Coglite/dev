import { action, computed, observable } from 'mobx';



export class WorkspaceStore {
    @observable public files: string[];
    @observable public activeFile: string;
    @observable public mode: string;
    @observable public entryFile: string;

    constructor() {
        this.files = observable([]);
        this.mode = 'jsx';
        this.activeFile = '';
        this.entryFile = '';
    }

    @action
    public setFiles = (files: string[]) => {
        this.files = observable(files);
    }

    @computed
    public get editorMode() {
        const extension = this.getFileExtension(this.activeFile);
        if (extension === 'jsx') {
            return 'jsx';
        } else if (extension === 'html') {
            return 'html';
        } else {
            return 'javascript';
        }
    }

    @action
    public setActiveFile = (file: string) => {
        this.activeFile = file;
    }

    @action
    public setEntryFile = (file: string) => {
        this.entryFile = file;
    }

    public isFileValid = (fileName: string) => {
        for (const file of this.files) {
            if (file.toLowerCase() === fileName.toLowerCase()) {
                return false;
            }
        }

        return true;
    }

    private getFileExtension(fileName: string) {
        if (fileName.split('.').length > 1) {
            return fileName.split('.')[1];
        }

        return null;
    }
}

export const workspaceStore = new WorkspaceStore();

