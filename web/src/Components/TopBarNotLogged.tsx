import React, { Component } from "react";
import styled from "styled-components";

import { ILinkInfo } from "../interfaces";
import NavButton from "./NavButton";
import Logo from "./Logo";
import LinkList from "./LinkList";
import LinkInfo from "../Classes/LinkInfo";
import { firstColor, thirdColor, fourthColor } from "../cssVariables";

export interface ITopBarNotLoggedProps {
	links: ILinkInfo[];
	currentPage?: ILinkInfo;
}

interface IState {
	isNavOpened?: boolean;
	isWide?: boolean;
}

export default class TopBarNotLogged extends Component<
	ITopBarNotLoggedProps,
	IState
> {
	state = { isNavOpened: false, isWide: window.innerWidth >= 800 };

	links = [
		new LinkInfo("About", "/about"),
		new LinkInfo("Log in", "/login"),
		new LinkInfo("Try it", "/register")
	];

	componentDidMount() {
		window.addEventListener("resize", (ev: UIEvent) => {
			this.setState({ isWide: window.innerWidth >= 800 });
		});
	}

	onNavButtonClick = (): void => {
		const { isNavOpened } = this.state;
		this.setState({ isNavOpened: !isNavOpened });
	};
	render() {
		const { isWide, isNavOpened } = this.state;
		return (
			<StyledTopBar>
				<Logo />
				<NavButton opened={isNavOpened} onClick={this.onNavButtonClick} />
				<LinkList
					links={this.links}
					showed={isWide || isNavOpened}
					specialColor={isWide ? fourthColor :thirdColor}
				/>
			</StyledTopBar>
		);
	}
}

const StyledTopBar = styled.header`
	background: ${firstColor};
	position: fixed;
	width: 100vw;
	height: 15vh;
	font-size: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 1;
`;
