import React, { Component, ReactNode, Fragment } from "react";
import LinkInfo from "../../Classes/LinkInfo";
import TopBarNotLogged from "../../Components/TopBarNotLogged";
import BackgroundNotLogged from "../../Components/BackgroundNotLogged"

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
		return (
			<Fragment>
				<TopBarNotLogged links={this.links} />
				<BackgroundNotLogged forceLogin>s</BackgroundNotLogged>
			</Fragment>
		);
	};
}
