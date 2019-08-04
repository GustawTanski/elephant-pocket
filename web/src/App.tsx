import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import LandingView from "./Views/LandingView";
import GlobalStyle from "./GlobalStyle";

export default () => {
	return (
		<Provider store={store}>
			<GlobalStyle />
			<Router>
				<Switch>
					<Route path="/" component={LandingView} />
				</Switch>
			</Router>
		</Provider>
	);
};
