import React, { Component } from "react";
import styled from "styled-components";

import { ILinkInfo } from "../interfaces";
import NavButton from "./Burger";
import Logo from "./Logo";
import LinkList from "./LinkList";
import LinkInfo from "../Classes/LinkInfo";
import { firstColor, thirdColor, fourthColor } from "../cssVariables";
import * as S from "./styles";

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

	onResize = (ev: UIEvent) => {
		this.setState({ isWide: window.innerWidth >= 800 });
	};

	componentDidMount() {
		window.addEventListener("resize", this.onResize);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.onResize);
	}

	onNavButtonClick = (): void => {
		const { isNavOpened } = this.state;
		this.setState({ isNavOpened: !isNavOpened });
	};
	render() {
		const { isWide, isNavOpened } = this.state;
		const { links } = this.props;
		return (
			<S.TopBar>
				<Logo />
				<NavButton />
				<LinkList
					links={links}
					showed={isWide || isNavOpened}
					specialColor={isWide ? fourthColor : thirdColor}
				/>
			</S.TopBar>
		);
	}
}
