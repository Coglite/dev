import { extendObservable } from "mobx"

export class BooleanStore {
  value: boolean

  constructor(defaultValue?: boolean) {
    extendObservable(this, {
      value: defaultValue !== undefined ? defaultValue : false,
    })
  }
}
