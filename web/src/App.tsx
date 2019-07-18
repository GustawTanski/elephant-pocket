import React, { Fragment } from "react";
import LandingView from "./Views/LandingView";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


export default () => {
	return (
		<Fragment>
			<GlobalStyle />
			<Router>
				<Switch>
					<Route path="/" component={LandingView} />
				</Switch>
			</Router>
		</Fragment>
	);
};
