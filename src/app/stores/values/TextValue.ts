import { action, observable } from "mobx"
import * as React from "react"

export const text = (value: string) => new TextValue(value)

class TextValue {
  @observable value = ""
  onChange = action(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => (this.value = value),
  )

  constructor(value: string) {
    this.value = value
  }
}
