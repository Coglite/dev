import { observable, action } from "mobx"

export class SnackBarService {
  @observable isVisible: boolean = false

  @observable message: string = ""

  @action
  Info(message: string): void {
    this.isVisible = true
    this.message = message
  }

  @action
  Hide(): void {
    this.isVisible = false
  }
}
