import * as io from 'socket.io-client';

var client = undefined as any;

export function initialize(url) {
    client = io(url);
    return client;
}

export function onInitialConfig(callback) {
   client.on('initialConfig', callback);
}

export function onProjectFileRead(callback) {
    client.on('projectFileRead', callback);
}

export function onComponentKit(callback) {
    client.on('componentKit', callback);
}

export function onPackageInfo(callback) {
    client.on('packageInfo', callback);
}

export function onMessage(callback) {
    client.on('message', callback);
}

export function onComponentKitInfo(callback) {
    client.on('componentKitInfo', callback);
}

export function onProjectFileInfo(callback) {
    client.on('projectFileInfo', callback);
}

export function onFileRead(callback) {
    client.on('readProjectFile', callback);
}

export function onWebpackDetail(callback) {
    client.on('webpackDetail', callback);
}

export function createProject(data) {
    client.emit('createProject', data);
}

export function writeCode(content) {
    client.emit('codeChange', content);
}

export function changeKit(kit) {
    client.emit('kitChange', kit);
}

export function installModule(name) {
    client.emit('moduleInstall', name);
}

export function uninstallModule(name) {
    client.emit('moduleUninstall', name);
}

export function uninstallComponentKit(name) {
    client.emit('componentKitUninstall', name);
}

export function installComponentKit(name) {
    client.emit('componentKitInstall', name);
}

export function createNewFile(fileName) {
    client.emit('createNewFile', fileName);
}

export function readProjectFile(fileName) {
    client.emit('readFile', fileName)
}

export function deleteProjectFile(fileName) {
    client.emit('deleteFile', fileName);
}

