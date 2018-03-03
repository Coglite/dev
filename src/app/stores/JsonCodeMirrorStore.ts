import * as codemirror from 'codemirror';
import { action, observable } from 'mobx';
import { FormProps } from 'semantic-ui-react';



export class JsonCodeMirrorStore {
  @observable options: codemirror.EditorConfiguration = {
    lineNumbers: true,
    mode: 'application/ld+json',
    theme: 'solarized dark',
    indentUnit: 2,
    indentWithTabs: false
  };

  setIndentUnit(value: number) {
    // タブの場合は４
    this.options.indentUnit = value > 0 ? value : 4;
  }

  setIndentWithTabs(value: number) {
    // タブ = true, 2, 4 = false
    this.options.indentWithTabs = !(value > 0);
  }

  @action.bound setIndent(e: React.ChangeEvent<HTMLSelectElement>, {value}: FormProps) {
    this.setIndentUnit(Number(value));
    this.setIndentWithTabs(Number(value));
  }
}
