import React, { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";
import { transitionHelper } from "./styles/mixins";

interface Props {
	transitionState?: transitionHelper.transitionStateType;
}

interface ILinkObject {
	url: string;
	name: string;
	primary?: boolean;
	secondary?: boolean;
}

export default class NavigationLinks extends Component<Props> {
	createLinks(links: Array<ILinkObject>): ReactNode {
		return links.map(link => (
			<S.LinkContainer
				key={link.url}
				primary={link.primary}
				secondary={link.secondary}
			>
				<Link to={link.url}>{link.name}</Link>
			</S.LinkContainer>
		));
	}

	createLinkObject(
		url: string,
		name: string,
		primary?: boolean,
		secondary?: boolean	
	): ILinkObject {
		return { url, name, primary, secondary };
	}

	links = [
		this.createLinkObject("/about", "About"),
		this.createLinkObject("/login", "Log in"),
		this.createLinkObject("/register", "Try it", true)
	];

	render(): ReactNode {
		return (
			<S.NavigationLinks {...this.props}>
				{this.createLinks(this.links)}
			</S.NavigationLinks>
		);
	}
}
