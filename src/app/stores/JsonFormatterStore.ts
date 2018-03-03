import * as codemirror from 'codemirror';
import { action, observable } from 'mobx';
import { DropdownItemProps, FormProps } from 'semantic-ui-react';

export class JsonFormatterStore {
  defaultText: string = '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n';

  @observable indent: string = '2'; // '\t'
  @observable text: string = '';
  @observable json: string = '';

  indents: DropdownItemProps[] = [
    {
      key: 'space2',
      text: 'space 2',
      value: '2',
    },
    {
      key: 'space4',
      text: 'space 4',
      value: '4',
    },
    {
      key: 'tab',
      text: 'tab',
      value: '\t',
    },
  ];

  localStorageKeyForIndet: string = 'jsonFormatterStore.indent';
  localStorageKeyForText: string = 'jsonFormatterStore.text';

  constructor() {
    const indent: string = this.getIndent();
    const text: string = this.getText();
    if (indent) {
      this._setIndent(indent);
    }
    if (text) {
      this.setText(text);
      this.setJson(this.stringify(text));
    } else {
      this.setJson(this.defaultText);
    }
  }

  getText(): string {
    let text: string = '';
    if (window.localStorage && window.localStorage.getItem(this.localStorageKeyForText) !== null ) {
      text = String(window.localStorage.getItem(this.localStorageKeyForText));
    }
    return text;
  }

  setText(text: string) {
    this.text = text;
  }

  setTextlocalStorage(text: string) {
    if (window.localStorage) {
      window.localStorage.setItem(this.localStorageKeyForText, text);
    }
  }

  setJson(text: string) {
    this.json = text || this.defaultText;
  }

  getIndent(): string {
    let indent: string = '';
    if (window.localStorage && window.localStorage.getItem(this.localStorageKeyForIndet) !== null ) {
      indent = String(window.localStorage.getItem(this.localStorageKeyForIndet));
    }
    return indent;
  }

  _setIndent(value: string) {
    this.indent = value;
  }

  setIndentlocalStorage(text: string) {
    if (window.localStorage) {
      window.localStorage.setItem(this.localStorageKeyForIndet, text);
    }
  }

  stringify(json: string) {
    let isParsed: boolean = false;
    let parsed: string = '';
    try {
      if (json) {
        parsed = JSON.parse(json);
        isParsed = parsed ? true : false;
      }
    } catch (e) {
      parsed = `${e.name} : ${e.message}`;
    }
    return isParsed ? JSON.stringify(parsed, null, this.castIndent()) : parsed;
  }

  castIndent(): number|string {
    return Number(this.indent) > 0 ? Number(this.indent) : this.indent;
  }

  @action.bound format(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setText(e.target.value);
    this.setTextlocalStorage(e.target.value);
    this.setJson(this.stringify(e.target.value));
  }

  @action.bound setIndent(e: React.ChangeEvent<HTMLSelectElement>, {value}: FormProps) {
    this._setIndent(value);
    this.setIndentlocalStorage(value);
    this.setJson(this.stringify(this.text));
  }

  @action.bound changeJson(editor: codemirror.Editor, data: codemirror.EditorChange, value: string) {
    this.setJson(value);
  }
}
