import React, { Component, ReactElement } from "react";
import styled from "styled-components";

import { ILinkInfo } from "../interfaces";
import LinkElement from "./LinkElement";
import { fourthColor } from "../cssVariables";
import CSSTransitionGroup from "react-transition-group/CSSTransition";
import rotateIn from "../KeyFrames/rotateIn";
import rotateOut from "../KeyFrames/rotateOut";

export interface ILinkListProps {
	links: ILinkInfo[];
	specialColor?: string;
	showed: boolean;
}

export default class extends Component<ILinkListProps> {
	linkMapFunction = (link: ILinkInfo): ReactElement => {
		const { showed, specialColor } = this.props;
		return (
			<li key={link.url}>
				<StyledLinkElement
					link={link}
					special={showed && link.isEqual({ url: "/register" })}
					bgColor={specialColor || fourthColor}
				/>
			</li>
		);
	};

	createRender = (): ReactElement | null => {
		const { links, showed } = this.props;
		return (
			<CSSTransitionGroup
				in={showed}
				timeout={1000}
				classNames="animated"
				unmountOnExit
			>
				<NavList key={1}>{links.map(this.linkMapFunction)}</NavList>
			</CSSTransitionGroup>
		);
	};
	render = (): ReactElement | null => this.createRender();
}

const StyledLinkElement = styled(LinkElement) `

`


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

	&.animated-enter ${StyledLinkElement} {
		opacity: 0;
	}

	&.animated-enter-active ${StyledLinkElement} {
		opacity: 1;
		transition: opacity 1s;
		span {
			animation: ${rotateIn} 1.3s 0.1s cubic-bezier(0.2, 1, 0.2, 1) both;
			transform-origin: top left;
		}
	}

	&.animated-exit ${StyledLinkElement} {
		opacity: 1;
	}

	&.animated-exit-active ${StyledLinkElement} {
		opacity: 0;
		/* transition: opacity 1s; */
		span {
			animation: ${rotateOut} 1s cubic-bezier(0.2, 1, 0.2, 1) both;
			transform-origin: 0;
		}
	}

	@media only screen and (max-height: 450px) {
		padding: 20vh 0;
	}

	@media only screen and (min-width: 800px) {
		padding: unset;
		height: unset;
		position: static;
		flex-direction: row;
		flex: 1.1;
		margin: 0 10px;
		&.animated-enter-active ${StyledLinkElement},
		&.animated-exit-active ${StyledLinkElement} {
			transition: none;
			span {
				animation: none;
			}
		}
	}
`;
