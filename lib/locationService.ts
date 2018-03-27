import * as path from 'path'

export function getProjectDirectory() {
    return path.resolve(__dirname, '../../proj');
}

export function getDataJsonPath() {
    return path.resolve(__dirname, '../../data/config.json');
}


