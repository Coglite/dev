/**
 * This file contains code that is initializing the app so the rest of the files run correctly.
 *
 * There is a few steps(IMPORTANT: those steps MUST be run in this exact order):
 *   1. Add the src/ folder to the NODE_PATH to be able to do absolute import(Relative to src folder)
 *   2. Update electron user data folder
 *   3. Initialize the logger
 *   4. Setup extension functions
 *   5. Call startBatchLabs from startup.ts
 */

// 1. Add the src/ folder to the NODE_PATH to be able to do absolute import(Relative to src folder)
import * as path from "path";
import "./init";

// 2. Update electron user data folder
import { app } from "electron";
app.setPath("userData", path.join(app.getPath("appData"), "coglite"));


// 3. Initialize the logger
import { logger } from "./logger";


// 4. Setup extension functions
import "reflect-metadata";
import "../common/extensions";


// 5. Call startBatchLabs from startup.ts
import {Constants as c} from './constants'
var mainhtml = c.urls.main
console.log(mainhtml)

import { startCogliteDesktop } from "./startup";

startCogliteDesktop().catch((e) => {
    logger.error("Error starting batchlabs", e);
});
