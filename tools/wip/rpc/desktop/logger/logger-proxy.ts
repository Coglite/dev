import * as bunyan from "bunyan"
import * as path from "path"
import { Constants } from "../constants"
import { PrettyStream } from "./pretty-stream"

const logsFolder = Constants.logsFolder

const stream = new PrettyStream()
stream.pipe(process.stderr)

export const logger = bunyan.createLogger({
  name: "Coglite Desktop",
  level: "debug",
  streams: [
    {
      stream: stream as any,
    },
    {
      type: "rotating-file",
      path: path.join(logsFolder, "desktop.log"),
      period: "1d", // daily rotation
      count: 3, // keep 3 back copies
    },
  ],
})

export const pythonLogger = bunyan.createLogger({
  name: "Coglite Python",
  level: "debug",
  streams: [
    {
      stream: stream as any,
    },
    {
      type: "rotating-file",
      path: path.join(logsFolder, "python-server.log"),
      period: "1d", // daily rotation
      count: 3, // keep 3 back copies
    },
  ],
})

export const renderLogger = bunyan.createLogger({
  name: "Coglite App",
  level: "debug",
  streams: [
    {
      stream: stream as any,
    },
    {
      type: "rotating-file",
      path: path.join(logsFolder, "app.log"),
      period: "1d", // daily rotation
      count: 3, // keep 3 back copies
    },
  ],
})
