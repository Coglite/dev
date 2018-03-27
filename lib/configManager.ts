var fs = require('fs-extra');
var path = require('path');
import { getDataJsonPath } from './locationService';

export function readProjectConfig() {
    return fs.readJsonSync(getDataJsonPath(), {throws: false});
}

export function changeActiveKit(name) {
    console.log(name)
    var file = getDataJsonPath();
    console.log(file)
    var dataObj = fs.readJsonSync(file, {throws: false});
    dataObj.activeComponentKit = name;
    fs.writeJSONSync(file, dataObj);
}

