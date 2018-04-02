import { hot } from 'react-hot-loader'
import * as React from "react";
import { BodyWidget } from "./modules/diagram/BodyWidget";
import { DiagramApplication } from "./modules/diagram/Diagram.Application";

	var diagramDemo = new DiagramApplication();
	
function Diagram(){
	return <BodyWidget currentDiagram={diagramDemo}/>
};


export default hot(module)(Diagram)