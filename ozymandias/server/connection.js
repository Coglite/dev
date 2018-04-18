#!/usr/bin/env node

const {readFile, writeFile, readdir} = require('fs');
const {resolve} = require('path');
const MITScheme = require('mit-scheme');

const root = resolve(__dirname, '..');
const jail = resolve(root, 'public');
const users = resolve(root, 'users');

const utf = 'utf8';

class Connection {
    constructor(name, file, exit, scmutils) {
        this.path = name ? resolve(users, name) : jail;
        this.file = file;
        this.exit = exit;
        this.scmutils = !!scmutils;

        this.files = null;
        this.socket = null;
        this.scheme = null;
        this.connected = false;
        this.open = false;
    }
    connect(socket) {
        const {scmutils, file, path} = this;
        this.socket = socket;
        this.connected = true;
        this.socket.on('message', ({utf8Data}) => this.message(JSON.parse(utf8Data)));
        this.socket.on('error', error => console.error(error));
        this.socket.on('close', event => {
            this.connected = false;
            this.close();
        });

        this.scheme = new MITScheme({scmutils, path, root});

        this.scheme.on('open', event => {
            this.open = true;
            this.files = this.scheme.files;
            if (file) {
                readFile(this.find(file), utf, (error, text) => this.push('load', {file, text}));
            }
        });

        this.scheme.on('data', data => this.send(data));
        this.scheme.on('error', error => console.error(error));
        this.scheme.on('close', event => {
            this.open = false;
            this.close();
        });
    }
    message({type, data}) {
        if (type === 'save' && this.files) {
            const {name, text} = data;
            const file = this.find(name);
            writeFile(file, text, utf, error => this.push('save', {error, name}));
        }
        else if (type === 'load' && this.files) readFile(this.find(data), utf, (error, text) => this.push('load', {file: data, text}));
        else if (type === 'open' && this.files) readdir(this.files, (error, files) => this.push('open', files || []));
        else if (type === 'eval' && this.open) this.scheme.write(data);
        else if (type === 'kill' && this.open) this.scheme.kill(data);
        else console.error('invalid type', type);
    }
    close() {
        this.exit(this.connected, this.open);

        if (this.open && this.scheme.state === 3) {
            this.open = false;
            this.scheme.close();
        }

        if (this.connected && this.socket.readyState === 1) {
            this.connected = false;
            this.socket.close();
        }
    }
    send(message) {
        if (this.connected && this.socket.connected) {
            this.socket.sendUTF(message);
        }
    }
    push(type, data) {
        this.send(JSON.stringify({type, data}));
    }
    find(name) {
        return resolve(this.files, name.split('/').join('-'));
    }
}

module.exports = Connection;
