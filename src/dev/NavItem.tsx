"use strict"

import { extendObservable } from "mobx"

export class NavItem {
  key: string
  page: any
  name?: string
  icon?: string

  constructor(key: string, page: any, name?: string, icon?: string) {
    extendObservable(this, {
      key: key,
      page: page,
      name: name,
      icon: icon,
    })
  }
}
