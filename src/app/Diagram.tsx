import { hot } from 'react-hot-loader'
import * as React from "react";
import { BodyWidget } from "./modules/diagram/BodyWidget";
import { DiagramApplication } from "./modules/diagram/Diagram.Application";

	var App = new DiagramApplication();
	
function Diagram(){
	return <BodyWidget app={App}/>
};

export default hot(module)(Diagram)