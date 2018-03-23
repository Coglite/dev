import {observable, action} from 'mobx';
import {createHashHistory} from 'history';

export class NavigationStore {

  @observable location = window.location;
  history = createHashHistory();

  @action
  push(location: string) {
    this.history.push(location);
  }

  @action
  replace(location: string) {
    this.history.replace(location);
  }

  @action
  go(n: number) {
    this.history.go(n);
  }

  @action
  goBack() {
    this.history.goBack();
  }

  @action
  goForward() {
    this.history.goForward();
  }
}
