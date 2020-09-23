import React, { Component, Fragment } from "react";

import TopBar from "../../TopBar";
import Background from "../../Background";
import LandingViewContent from "./LandingViewContent";

interface Props {
	history: { push: (path: string) => void };
}

export default class LandingView extends Component<Props> {
	render() {
		const { history } = this.props;
		return (
			<Fragment>
				<TopBar />
				<Background history={history} forceLogin>
					<LandingViewContent />
				</Background>
			</Fragment>
		);
	}
}
