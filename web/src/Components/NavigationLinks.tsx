import React, { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";
import { transitionHelper } from "./styles/mixins";

interface Props {
	transitionState?: transitionHelper.transitionStateType;
}

export default class NavigationLinks extends Component<Props> {
	render(): ReactNode {
		return (
			<S.NavigationLinks {...this.props}>
				<S.LinkContainer>
					<Link to="/about">About</Link>
				</S.LinkContainer>
				<S.LinkContainer>
					<Link to="/login">Log in</Link>
				</S.LinkContainer>
				<S.LinkContainer primary>
					<Link to="/register">Try it</Link>
				</S.LinkContainer>
			</S.NavigationLinks>
		);
	}
}
