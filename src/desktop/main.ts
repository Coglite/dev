/**
 * This file contains code that is initializing the app so the rest of the files run correctly.
 *
 * There is a few steps(IMPORTANT: those steps MUST be run in this exact order):
 *   1. Update electron user data folder
 *   2. Setup extension functions
 *   3. Call startCogliteDesktop()  from startup.ts
 */

// 1. Update electron user data folder
import * as path from "path";
import { app } from "electron";
app.setPath("userData", path.join(app.getPath("appData"), "coglite"));


// 2. Setup extension functions
import "reflect-metadata";
import "../common/extensions";


// 3. Call script from startup.ts
import {Constants as c} from './constants'
import { logger } from "./logger";
import { startCogliteDesktop } from "./startup";

var mainhtml = c.urls.main
console.log(mainhtml)

startCogliteDesktop().catch((e) => {
    logger.error("Error starting Coglite Desktop", e);
});
