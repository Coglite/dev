
import { Location } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import { action } from 'mobx';
import { MenuItemProps } from 'semantic-ui-react';

export class RouterStore {
  history = createBrowserHistory();
  route = {
    top: {
      path: '/',
      title: 'Utility'
    },
    sqlFormatter: {
      path: '/sql_formatter',
      title: 'SQL format : Utility'
    },
    jsonFormatter: {
      path: '/json_formatter',
      title: 'JSON format : Utility'
    },
    qrcode: {
      path: '/qrcode',
      title: 'QRCode : Utility'
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

  @action.bound goTo(event: React.MouseEvent<HTMLElement>, {name}: MenuItemProps) {
    this.history.push(String(name));
  }
}
