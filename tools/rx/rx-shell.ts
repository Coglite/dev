import * as Rx from "@reactivex/rxjs"
import WritableStream = NodeJS.WritableStream
import ReadableStream = NodeJS.ReadableStream
import { writeSync } from "fs"
import { fsyncSync } from "fs"

export type StreamEvent = [string, any]

export function inputEvent$({
  stdin,
  stdout,
}: { stdin: ReadableStream; stdout: WritableStream } = process): Rx.Observable<StreamEvent> {
  return new Rx.Observable<StreamEvent>((subscriber: Rx.Subscriber<StreamEvent>) => {
    var lineBuffer: Buffer[] = []

    function processLineBuffer() {
      if (lineBuffer.length == 0) return

      var nextValue = JSON.parse(Buffer.concat(lineBuffer).toString("utf8"))
      lineBuffer = []

      if (
        !(nextValue instanceof Array) ||
        nextValue.length != 2 ||
        typeof nextValue[0] != "string"
      ) {
        throw new Error("Received unexpected input " + JSON.stringify(nextValue))
      }

      subscriber.next(nextValue as any)
    }

    function handleReadable() {
      try {
        var idx: number
        var data: Buffer = stdin.read() as Buffer

        if (data == null) return

        while ((idx = data.indexOf("\n")) != -1) {
          lineBuffer.push(data.slice(0, idx))
          processLineBuffer()
          data = data.slice(idx + 1)
        }

        if (data.length > 0) lineBuffer.push(data)
      } catch (e) {
        subscriber.error(e)
      }
    }

    function handleError(err: any) {
      subscriber.error(err)
    }

    var handleEnd = () => {
      try {
        processLineBuffer()
      } catch (e) {
        subscriber.error(e)
        return
      }
      subscriber.complete()
    }

    stdin.on("readable", handleReadable)
    stdin.once("error", handleError)
    stdin.once("end", handleEnd)
    stdout.once("error", handleError)
    stdout.once("end", handleEnd)

    return () => {
      stdin.removeListener("readable", handleReadable)
      stdin.removeListener("end", handleEnd)
      stdin.removeListener("error", handleError)
      stdout.removeListener("error", handleError)
      stdout.removeListener("end", handleEnd)
    }
  }).share()
}

export function subscribeToOutput(
  outputEvent$: Rx.Observable<StreamEvent>,
  logging$: Rx.Observable<string>,
  stdoutFd = 1,
  stderrFd = 2,
) {
  const logError = err => {
    writeSync(stderrFd, "" + err + "\n")
  }
  var subscription = outputEvent$.subscribe(event => {
    writeSync(stdoutFd, JSON.stringify(event) + "\n")
  }, logError)

  subscription.add(logging$.subscribe(logError, logError))

  return subscription
}
