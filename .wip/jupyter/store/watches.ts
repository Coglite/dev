/* @flow */

import { action, observable } from "mobx";
import WatchStore from "./watch";
import Kernel from "../services/kernel";
import store from "./index";

export default class WatchesStore {
  kernel: Kernel;
  @observable watches: Array<WatchStore> = [];

  constructor(kernel: Kernel) {
    this.kernel = kernel;

    this.kernel.addWatchCallback(this.run);
    this.addWatch();
  }

  @action
  createWatch = () => {
    const lastWatch = this.watches[this.watches.length - 1];
    if (!lastWatch || lastWatch.getCode().replace(/\s/g, "") !== "") {
      const watch = new WatchStore(this.kernel);
      this.watches.push(watch);
      return watch;
    }
    return lastWatch;
  };

  @action
  addWatch = () => {
    this.createWatch().focus();
  };

  @action
  addWatchFromEditor = (editor: any) => {
    if (!editor) return;
    const watchText = editor.getSelectedText();
    if (!watchText) {
      this.addWatch();
    } else {
      const watch = this.createWatch();
      watch.setCode(watchText);
      watch.run();
    }
  };

  @action
  removeWatch = () => {
    const watches = this.watches
      .map((v, k) => ({
        name: v.getCode(),
        value: k
      }))
      .filter(obj => obj.value !== 0 || obj.name !== "");
}


  @action
  run = () => {
    this.watches.forEach(watch => watch.run());
  };
}
