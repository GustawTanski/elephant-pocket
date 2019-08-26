import React, { Component, Fragment } from "react";
import TopBar from "../Components/TopBar";
import Background from "../Components/Background";
import RegisterViewContent from "../Components/RegisterViewContent";

interface Props {
	history: { push: (path: string) => void };
}

export default class RegisterView extends Component<Props> {
	render() {
		const { history } = this.props;
		return (
			<Fragment>
				<TopBar />
				<Background history={history} forceLogin>
					<RegisterViewContent />
				</Background>
			</Fragment>
		);
	}
}
