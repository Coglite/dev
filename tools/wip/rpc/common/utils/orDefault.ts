import * as util from "util"

export const orDefault = <T>(value: T, defaultValue?: T, pred?: (x: T) => boolean) =>
  util.isFunction(pred)
    ? pred(value)
      ? value
      : defaultValue
    : !util.isNullOrUndefined(value)
      ? value
      : defaultValue
