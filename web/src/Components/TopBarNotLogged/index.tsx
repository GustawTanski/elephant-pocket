import React, { Component } from "react";
import { ILinkInfo } from "../../interfaces";
import styled from "styled-components";

export interface ITopBarNotLoggedProps {
	links: ILinkInfo[];
	currentPage?: ILinkInfo;
}

export default class TopBarNotLogged extends Component<ITopBarNotLoggedProps> {
	renderLinks() {
		const { links } = this.props;
		return links.map((link: ILinkInfo) => <li><a href={link.url}>{link.name}</a></li>);
	}
	render() {
		return (
			<Bar>
				<div className="logo">Elephant Pocket</div>
				<ul className="menu">{this.renderLinks()}</ul>
			</Bar>
		);
	}
}

const Bar = styled.header`
	background: var(--firstColor);
	position: fixed;
	width: 100vw;
	height: 15vh;
	font-size: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.logo {
		font-family: var(--decorativeFont);
		font-size: 1.33em;
		padding: 1em;

		@media only screen and (min-width: 420px) {
			font-size: 1.6em;
		}

		@media only screen and (min-width: 700px) {
			font-size: 2em;
		}

		@media only screen and (min-width: 1200px) {
			font-size: 2.5em;
		}
	}
`;
