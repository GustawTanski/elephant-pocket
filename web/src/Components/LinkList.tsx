import React, { Component, ReactElement } from "react";
import styled from "styled-components";

import { ILinkInfo } from "../interfaces";
import LinkElement from "./LinkElement";
import { fourthColor } from "../cssVariables";
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
	render(): ReactElement{
		const { links, showed, specialColor } = this.props;
		return (
			<NavList>
				{links.map(link => (
					<LinkElement
						key={link.url}
						link={link}
						special={showed && link.isEqual({ url: "/register" })}
						bgColor={specialColor || fourthColor}
						className={showed ? "enter" : "exit"}
					/>
				))}
			</NavList>
		);
	}
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

	.enter {
		animation: ${appear} 1.3s 0.1s cubic-bezier(0.2, 1, 0.2, 1) both;
		a {
			animation: ${rotateIn} 1.3s 0.1s cubic-bezier(0.2, 1, 0.2, 1) both;
			transform-origin: bottom left;
		}
	}

	.exit {
		animation: ${disappear} 1s cubic-bezier(0.2, 1, 0.2, 1) both;
		a {
			animation: ${rotateOut} 1s cubic-bezier(0.2, 1, 0.2, 1) both;
			transform-origin: 0;
		}
	}

	@media only screen and (min-width: 800px) {
		position: static;
		flex-direction: row;
		flex: 1;
		margin: 0 10px;
		.exit, .enter {
			animation: none;
			a {
				animation: none
			}
		}
	}
`;
