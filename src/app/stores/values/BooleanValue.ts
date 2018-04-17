import { extendObservable } from "mobx"

export class BooleanStore {
  booleanValue: boolean

  constructor(defaultValue?: boolean) {
    extendObservable(this, {
      booleanValue: defaultValue !== undefined ? defaultValue : false,
    })
  }
}
