// tslint:disable

declare module "element-resize-detector" {
  namespace ElementResizeDetectorMaker {

  }
  function ElementResizeDetectorMaker(options: any): ElementResizeDetector

  class ElementResizeDetector {
    listenTo(element: HTMLElement, callback: (el: HTMLElement) => void)
    uninstall(element: HTMLElement)
  }
  export = ElementResizeDetectorMaker
}

// https://craig.is/killing/mice
declare module "mousetrap" {
  function bind(key: string, callback: Function)
  function unbind(key: string, callback: Function)
  function trigger(key: string)
  function reset()
}

declare type Environment = "production" | "development" | "test"

// Gloval variables set by webpack
declare const ENV: Environment

type StringMap<V> = { [key: string]: V }

type AttrOf<T> = { [P in keyof T]: T[P] }

type ComponentSize = "small" | "normal" | "large"

declare var nodeModule: NodeModule
interface NodeModule {
  id: string
}

declare var window: Window
interface Window {
  process: any
  require: any
}

declare namespace NodeJS {
  interface Global {}
}
