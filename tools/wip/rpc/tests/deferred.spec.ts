import { Deferred } from "./deferred"
export const F = f => done =>
  f()
    .then(done)
    .catch(done.fail)

describe("Deferred", () => {
  it(
    "succeed",
    F(() => {
      const deferred = new Deferred()

      const promise = deferred.promise.then(value => {
        expect(value).toEqual("resolved-value")
      })

      deferred.resolve("resolved-value")
      return promise
    }),
  )

  it(
    "pass error",
    F(() => {
      const deferred = new Deferred()

      const promise = deferred.promise
        .then(() => {
          fail("Promise should not have succeeded here")
        })
        .catch(value => {
          expect(value).toEqual("rejected-error")
        })

      deferred.reject("rejected-error")
      return promise
    }),
  )
})
