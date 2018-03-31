import { hot } from 'react-hot-loader'
import * as React from "react";
import { BodyWidget } from "./components/BodyWidget";
import { Application } from "./Application";

function Diagram() {
	var App = new Application();
	return <BodyWidget app={App}/>
};

export default hot(module)(Diagram)