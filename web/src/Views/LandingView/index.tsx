import React, { Component, ReactNode } from "react";
import LinkInfo from "../../Classes/LinkInfo";
import TopBarNotLogged from "../../Components/TopBarNotLogged";

export default class LandingView extends Component {
	private links: LinkInfo[];

	constructor(props: any) {
		super(props);
		this.links = [
			new LinkInfo("About", "/about"),
			new LinkInfo("Log In", "/login"),
			new LinkInfo("Try It", "/register")
		];
	}
	render = (): ReactNode => {
		return <TopBarNotLogged links={this.links}/>;
	};
}
