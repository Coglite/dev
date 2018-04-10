/**
 * Wrap options for all batch calls to add custom headers.
 * @param options Options
 */
//import { Constants } from "../../../constants";
import { BatchResult } from "../models";

export function wrapOptions<T>(options?: T): T {
    const newOptions: any = options || {};
    newOptions.customHeaders = {
       // "User-Agent": `Coglite/${Constants.version}`,
        "User-Agent": `Coglite/desktop-dev`,
    };
    return newOptions;
}

export function mapGet(promise: Promise<any>): Promise<BatchResult> {
    return promise.then((data) => {
        return { data };
    });
}
