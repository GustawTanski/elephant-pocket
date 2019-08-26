import React, { Component, Fragment } from "react";

import TopBar from "../Components/TopBar";
import Background from "../Components/Background";
import LandingViewContent from "../Components/LandingViewContent";


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
