import * as path from "path";
import { Constants } from "../../src/desktop/constants";
import { execCommand } from "../../src/desktop/core";
import { getPythonPath } from "../../src/desktop/python-process";

getPythonPath().then((pythonPath) => {
    console.log(pythonPath);
}).catch((errors) => {
    console.error(errors);
    process.exit(1);
});
