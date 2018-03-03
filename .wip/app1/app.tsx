import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles/main.scss'

import 'codemirror/mode/sql/sql.js';
import 'codemirror/mode/javascript/javascript.js';

//@ts-ignore
import env from 'env'

import { remote } from "electron";
import * as jetpack from "fs-jetpack";
const appDir = jetpack.cwd(remote.app.getAppPath());
const manifest = appDir.read("package.json", "json");


import {Main}  from "./main";

ReactDOM.render(
  <Main compiler="TypeScript" framework="React" />,
  document.getElementById("app")
);
