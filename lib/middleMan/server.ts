var socket = require('socket.io');
import {readProjectConfig} from '../configManager';
var io = null;

export function initialize(app, handlers) {
    io = socket(app);
    io.on('connection', function (socket) {
        var config = readProjectConfig();
        handlers.onConnection(socket);
        socket.on('createProject', handlers.onCreateProject);
        socket.on('codeChange', handlers.onCodeChange);
        socket.on('kitChange', function(kit) {
            handlers.onKitChange(kit, socket);
        });
        socket.on('moduleInstall', function(moduleName) {
            handlers.onModuleInstall(moduleName, socket);
        });
        socket.on('moduleUninstall', function(moduleName) {
            handlers.onModuleUninstall(moduleName, socket);
        });
        socket.on('componentKitUninstall', function(moduleName) {
            handlers.onComponentKitUninstall(moduleName, socket);
        });
        socket.on('componentKitInstall', function(moduleName) {
            handlers.onComponentKitInstall(moduleName, socket);
        });
        socket.on('createNewFile', function(fileName) {
            handlers.onCreateNewFile(fileName, socket);
        });
        socket.on('readFile', function(fileName) {
            handlers.onReadFile(fileName, socket);
        });
        socket.on('deleteFile', function(fileName) {
            handlers.onDeleteFile(fileName, socket);
        });
    });
}

