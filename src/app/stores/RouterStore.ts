
import { Location } from 'history';

import {action} from 'mobx';
import {createHashHistory} from 'history';

export default class RouterStore {
  history = createHashHistory();
  route = {
    top: {
      path: '/',
      title: 'Coglite'
    },
    sqlFormatter: {
      path: '/sql_formatter',
      title: 'SQL format : Coglite'
    },
    jsonFormatter: {
      path: '/json_formatter',
      title: 'JSON format : Coglite'
    },
    qrcode: {
      path: '/qrcode',
      title: 'QRCode : Coglite'
    }
  };

  constructor() {
    this.changeTitle(this.history.location);
    this.history.listen((location: Location) => {
      this.changeTitle(location);
    });
  }

  changeTitle(location: Location) {
    for (const route in this.route) {
      if (this.route.hasOwnProperty(route) && this.route[route].path === location.pathname) {
        document.title = this.route[route].title;
      }
    }
  }

  @action.bound isActive(path: string): boolean {
    return location.pathname === path;
  }

  @action.bound goTo(event: React.MouseEvent<HTMLElement>, {name}: any) {
    this.history.push(String(name));
  }
}
