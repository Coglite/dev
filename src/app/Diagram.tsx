import * as React from "react";
import { BodyWidget } from "./components/BodyWidget";
import { Application } from "./Application";



export let Diagram = () => {
	var app = new Application();

	return <BodyWidget app={app} />;
};

export default Diagram