import { Subject } from "rxjs/Rx"

const event$ = new Subject()

export const eventPayloadOfType$ = type =>
  event$.filter(event => event.type == type).map(event => event.payload)
export const eventOfTypes$ = (...types) => event$.filter(evt => types.includes(evt.type))
export const emitEvent = (type, payload) =>
  event$.next(payload !== undefined ? { type, payload } : { type })

export default event$
