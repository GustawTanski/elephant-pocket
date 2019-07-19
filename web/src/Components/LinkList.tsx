import React, { Component, ReactElement } from "react";
import styled from "styled-components";

import { ILinkInfo } from "../interfaces";
import LinkElement from "./LinkElement";
import { fourthColor } from "../cssVariables";
import CSSTransitionGroup from "react-transition-group/CSSTransition";
import rotateIn from "../KeyFrames/rotateIn";
import rotateOut from "../KeyFrames/rotateOut";
import appear from "../KeyFrames/appear";
import disappear from "../KeyFrames/disappear";

export interface ILinkListProps {
	links: ILinkInfo[];
	specialColor?: string;
	showed: boolean;
}

export default class extends Component<ILinkListProps> {
	linkMapFunction = (link: ILinkInfo): ReactElement => {
		const { showed, specialColor } = this.props;
		return (
			<CSSTransitionGroup
				in={showed}
				timeout={1000}
				classNames="animated"
				unmountOnExit
			>
				<LinkElement
					key={link.url}
					link={link}
					special={showed && link.isEqual({ url: "/register" })}
					bgColor={specialColor || fourthColor}
				/>
			</CSSTransitionGroup>
		);
	};

	createRender = (): ReactElement | null => {
		const { links } = this.props;
		return <NavList>{links.map(this.linkMapFunction)}</NavList>;
	};
	render = (): ReactElement | null => this.createRender();
}
const NavList = styled.ul`
	top: 0;
	left: 0;
	list-style: none;
	display: flex;
	flex-direction: column;
	position: absolute;
	z-index: -1;
	height: 100vh;
	width: 100vw;
	padding: 30vh 0;
	justify-content: space-around;
	align-items: center;

	.animated-enter {
		opacity: 0;
	}

	.animated-enter-active {
		opacity: 1;
		transition: opacity 1s;
		a {
			animation: ${rotateIn} 1.3s 0.1s cubic-bezier(0.2, 1, 0.2, 1) both;
			transform-origin: top left;
		}
	}

	.animated-exit {
		opacity: 1;
	}

	.animated-exit-active {
		opacity: 0;
		transition: opacity 1s;
		a {
			animation: ${rotateOut} 1s cubic-bezier(0.2, 1, 0.2, 1) both;
			transform-origin: 0;
		}
	}

	@media only screen and (min-width: 800px) {
		padding: unset;
		height: unset;
		position: static;
		flex-direction: row;
		flex: 1;
		margin: 0 10px;
		.animated-enter-active,
		.animated-exit-active {
			transition: none;
			a {
				animation: none;
			}
		}
	}
`;
