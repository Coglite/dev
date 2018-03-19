import * as React from "react";
import { BodyWidget } from "./components/BodyWidget";
import { Application } from "./Application";


export function Diagram() {
	var App = new Application();
	return <BodyWidget app={App}/>
};

export {Diagram as default, Diagram}