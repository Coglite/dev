// tslint:disable:no-console
import * as path from "path";
import { Constants } from "../../src/server/client-constants";
import { execCommand } from "../../src/server/core";
import { getPythonPath } from "../../src/server/python-process";

getPythonPath().then((pythonPath) => {
    console.log(pythonPath);
}).catch((errors) => {
    console.error(errors);
    process.exit(1);
});
