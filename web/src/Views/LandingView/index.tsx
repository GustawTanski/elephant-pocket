import React, { Component, ReactNode, Fragment } from "react";
import LinkInfo from "../../Classes/LinkInfo";
import TopBarNotLogged from "../../Components/TopBarNotLogged";
import BackgroundNotLogged from "../../Components/BackgroundNotLogged";
import LandingViewContent from "../../Components/LandingViewContent";

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
				<BackgroundNotLogged context={this.context} forceLogin>
					<LandingViewContent />
				</BackgroundNotLogged>
			</Fragment>
		);
	};
}
