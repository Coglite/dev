import * as React from 'react';
import * as ReactDOM from 'react-dom';

//import './styles/main.scss'
import "./styles/main.scss";
import "normalize.css/normalize.css"


import {Diagram}  from "./Diagram";

ReactDOM.render(
  <Diagram/>,
  document.getElementById("app")
);
