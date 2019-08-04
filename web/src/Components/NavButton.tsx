import React, { Component, ReactElement } from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { menu } from "react-icons-kit/feather/menu";
import { x } from "react-icons-kit/feather/x";

import { fourthColor } from "../cssVariables";
import underlineFocus from "../Atoms/underlineFocus";

export interface INavButtonProps {
	opened: boolean;
	onClick?: () => any;
}

interface IState {}

export default class NavButton extends Component<INavButtonProps, IState> {
	render = (): ReactElement => {
		const { opened, onClick } = this.props;
		return (
			<StyledNavButton onClick={onClick} opened={opened}>
				<Icon icon={!opened ? menu : x} size={20} />
			</StyledNavButton>
		);
	};
}

const dim = 39;

const StyledNavButton = styled.button<{ bg?: string; opened: boolean }>`
	color: inherit;
	border: 0;
	font-size: 1.5rem;
	position: relative;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	background: transparent;
	width: ${dim}px;
	height: ${dim}px;
	font-weight: 700;
	cursor: pointer;
	margin: 5px 1em;
	outline: 0;
	/* ${underlineFocus} */

	i {
		transition: transform .5s;	
	}

	:active i {
		transform: translateY(10px);
	}

	::before {
		content: "";
		position: absolute;
		z-index: -1;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: ${props => props.bg || fourthColor};
		border-radius: 19px 0 19px 0;
		will-change: transform;
		transition: transform 0.9s cubic-bezier(0.2, 1, 0.2, 1) 0s;

		${props => props.opened && "transform: scale(45);"}
	}

	@media only screen and (min-width: 800px) {
		display: none;
	}
`;
