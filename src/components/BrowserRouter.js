import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App.js";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter basename={window.location.pathname || ""}>
			<Route exact path="/" component={App} />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
