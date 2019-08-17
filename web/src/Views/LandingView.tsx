import React, { Component, Fragment } from "react";
import Navigation from "../Components/Navigation";
import TopBar from "../Components/TopBar";
import Logo from "../Components/Logo"

export default class LandingView extends Component {
	render() {
		return (
			<TopBar>
				<Logo />
				<Navigation />
			</TopBar>
		);
	}
}
