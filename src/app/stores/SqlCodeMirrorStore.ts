import * as codemirror from 'codemirror';
import { action, observable } from 'mobx';
import { DropdownItemProps, FormProps } from 'semantic-ui-react';

export class SqlCodeMirrorStore {
  
  @observable options: codemirror.EditorConfiguration = {
    lineNumbers: true,
    mode: 'text/x-sql',
    theme: 'solarized dark',
  };

  modes: DropdownItemProps[] = [
    {
      key: 'sql',
      text: 'text/x-sql',
      value: 'text/x-sql',
    },
    {
      key: 'mysql',
      text: 'text/x-mysql',
      value: 'text/x-mysql',
    },
    {
      key: 'mssql',
      text: 'text/x-mssql',
      value: 'text/x-mssql',
    },
    {
      key: 'pgsql',
      text: 'text/x-pgsql',
      value: 'text/x-pgsql',
    },
  ];

  localStorageKey: string = 'sqlCodeMirrorStore.options.mode';

  constructor() {
    const mode: string = this.getMode();
    if (mode) {
      this.setMode(mode);
    }
  }

  getMode(): string {
    let mode: string = '';
    if (window.localStorage && window.localStorage.getItem(this.localStorageKey) !== null ) {
      mode = String(window.localStorage.getItem(this.localStorageKey));
    }
    return mode;
  }

  setMode(value: string) {
    this.options.mode = value;
  }

  setlocalStorage(value: string) {
    if (window.localStorage) {
      window.localStorage.setItem(this.localStorageKey, value);
    }
  }

  @action.bound setOptions(e: React.ChangeEvent<HTMLSelectElement>, {value}: FormProps) {
    this.setMode(value);
    this.setlocalStorage(value);
  }
}
