import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import LandingView from "./Views/LandingView";
import GlobalStyle from "./GlobalStyle";
import RegisterView from "./Views/RegisterView";

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
