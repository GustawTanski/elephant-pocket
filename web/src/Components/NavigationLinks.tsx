import React, { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

import * as S from "./styles"
import { transitionHelper } from "./styles/mixins"

interface Props {
	transitionState?: transitionHelper.transitionStateType;
}

export default class NavigationLinks extends Component<Props> {
	render(): ReactNode {
		// debugger;
		return (
			<S.NavigationLinks {...this.props}>
				<Link to="/about">About</Link>
				<Link to="/login">Log in</Link>
				<Link to="/register">Try it</Link>
			</S.NavigationLinks>
		);
	}
}
