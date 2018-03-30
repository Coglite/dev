import * as React from "react";
import { BodyWidget } from "./components/BodyWidget";
import { Application } from "./Application";
import { hot } from 'react-hot-loader'

function DiagramBase() {
	var App = new Application();
	return <BodyWidget app={App}/>
};

export let Diagram = hot(module)(DiagramBase)