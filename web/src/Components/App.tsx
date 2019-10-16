import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../Redux/store";
import LandingView from "./Views/LandingView/LandingView";
import GlobalStyle from "../globals/GlobalStyle";
import RegisterView from "./Views/RegisterView/RegisterView";

export default () => {
	return (
		<Provider store={store}>
			<GlobalStyle />
			<Router >
				<Switch>
					<Route path="/register" component={RegisterView} />
					<Route path="/" component={LandingView} />
				</Switch>
			</Router>
		</Provider>
	);
};
