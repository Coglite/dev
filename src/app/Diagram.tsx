import { hot } from 'react-hot-loader'
import * as React from "react";
import { BodyWidget } from "./components/BodyWidget";
import { Application } from "./SRD.Application";

	var App = new Application();
	
function Diagram(){
	return <BodyWidget app={App}/>
};

export default hot(module)(Diagram)