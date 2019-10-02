import React, { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

import * as S from "./styled";
import { transitionHelper } from "./styled/mixins";

interface Props {
	transitionState?: transitionHelper.transitionStateType;
	isWide: boolean;
}

interface ILinkObject {
	url: string;
	name: string;
	primary: boolean;
	secondary: boolean;
}

export default class NavigationLinks extends Component<Props> {
	createLinks(links: Array<ILinkObject>): ReactNode {
		return links.map(this.createLinkComponent);
	}

	createLinkComponent(link: ILinkObject) {
		return (
			<S.LinkContainer as="li" key={link.url}>
				<Link to={link.url}>
					<S.LinkContent primary={link.primary} secondary={link.secondary}>
						<span className="anim">{link.name}</span>
					</S.LinkContent>
				</Link>
			</S.LinkContainer>
		);
	}

	createLinkObject(
		url: string,
		name: string,
		primary: boolean = false,
		secondary: boolean = false
	): ILinkObject {
		return { url, name, primary, secondary };
	}

	render(): ReactNode {
		const { createLinkObject } = this;
		const { isWide } = this.props;
		return (
			<S.NavigationLinks {...this.props}>
				{this.createLinks([
					createLinkObject("/about", "About"),
					createLinkObject("/login", "Log in"),
					createLinkObject("/register", "Try it", !isWide, isWide)
				])}
			</S.NavigationLinks>
		);
	}
}
