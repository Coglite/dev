/* @flow */

import { CompositeDisposable } from "event-kit";
import { observable, computed, action, IObservableArray } from "mobx";
import { getEmbeddedScope } from "../services/utils";

import * as _ from "lodash";

import Config from "../services/config";

//import MarkerStore from "./markers";

import kernelManager from "../services/kernel-manager";
import Kernel from "../services/kernel";


const commutable = require("@nteract/commutable");



export class Store {
  config: {}
  subscriptions = new CompositeDisposable();
  //markers = new MarkerStore();
  runningKernels: IObservableArray<Kernel> = observable([]);
  @observable kernelMapping: KernelMapping = new Map();
  @observable startingKernels: Map<string, boolean> = new Map();
  //@observable editor = atom.workspace.getActiveTextEditor();
  
  @observable configMapping: Map<string, any> = new Map();

  @computed
  get kernel(): Kernel {
    if (!this.filePath) return null;
    const kernel = this.kernelMapping.get(this.filePath);
    if (!kernel || kernel instanceof Kernel) return kernel;
  
  }

  @computed
  get filePath(): string {
    return this.editor ? this.editor.getPath() : null;
  }

  @computed
  get notebook() {
    const editor = this.editor;
    if (!editor) {
      return null;
    }
    // Should we consider starting off with a monocellNotebook ?
    let notebook = commutable.emptyNotebook;
    const cellRanges = codeManager.getCells(editor);
    _.forEach(cellRanges, cell => {
      const { start, end } = cell;
      let source = codeManager.getTextInRange(editor, start, end);
      source = source ? source : "";
      const newCell = commutable.emptyCodeCell.set("source", source);
      notebook = commutable.appendCellToNotebook(notebook, newCell);
    });
    return commutable.toJS(notebook);
  }

  @action
  startKernel(kernelDisplayName: string) {
    this.startingKernels.set(kernelDisplayName, true);
  }

  @action
  newKernel(
    kernel: Kernel,
    filePath: string,
    editor: any,
  ) {
    this.kernelMapping.set(filePath, kernel)
    const index = this.runningKernels.findIndex(k => k === kernel);
    if (index === -1) {
      this.runningKernels.push(kernel);
    }
    // delete startingKernel since store.kernel now in place to prevent duplicate kernel
    this.startingKernels.delete(kernel.kernelSpec.display_name);
  }

  @action
  deleteKernel(kernel: Kernel) {
    this._iterateOverKernels(kernel,(_, file) => {
        this.kernelMapping.delete(file);
    });

    this.runningKernels.remove(kernel);
  }

  _iterateOverKernels(
    kernel: Kernel,
    func: (kernel: Kernel | KernelObj, file: string) => any,
    func2: (obj: KernelObj, file: string, grammar: string) => any = func
  ) {
    this.kernelMapping.forEach((kernelOrObj, file) => {
      if (kernelOrObj === kernel) {
        func(kernel, file);
      }

      if (kernelOrObj instanceof Kernel === false) {
        _.forEach(kernelOrObj, (k, grammar) => {
          if (k === kernel) {
            func2(kernelOrObj, file, grammar);
          }
        });
      }
    });
  }

  getFilesForKernel(kernel: Kernel) {
    const files = [];
    this._iterateOverKernels(kernel, (_, file) => files.push(file));
    return files;
  }

  @action
  dispose() {
    this.subscriptions.dispose();
    //this.markers.clear();
    this.runningKernels.forEach(kernel => kernel.destroy());
    this.runningKernels.clear();
    this.kernelMapping.clear();
  }




  @action
  setConfigValue(keyPath: string, newValue: any) {
    if (!newValue) {
      newValue = config.get(keyPath);
    }
    this.configMapping.set(keyPath, newValue);
  }

  forceEditorUpdate() {
    // Force mobx to recalculate filePath (which depends on editor observable)

    const currentEditor = this.editor;
    this.updateEditor(null);
    this.updateEditor(currentEditor);
  }
}

const store = new Store();
export default store;

// For debugging
window.hydrogen_store = store;
