import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ILinkInfo } from "../globals/interfaces";

export interface ILinkElementProps {
	link: ILinkInfo;
	className?: string;
	bgColor?: string;
	special?: boolean;
}

export default (props: ILinkElementProps): React.ReactElement => {
	const { link, ...stylingProps } = props;
	return (
		<StyledLink {...stylingProps} to={link.url}>
			<span>{link.name}</span>
		</StyledLink>
	);
};

const StyledLink = styled(Link)<{ special?: boolean; bgColor?: string }>`
	--multiplier: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(var(--multiplier) * 42px);
	width: calc(var(--multiplier) * 138px);
	font-size: calc(var(--multiplier) * 1.5rem);
	overflow: hidden;
	transition: transform 0.5s;
	text-decoration: none;
	color: inherit;
	outline: 0;

	${props => {
		if (!props.special) return "";
		else
			return `
			background: ${props.bgColor};
			border-radius: calc(var(--multiplier)*27px) 0 calc(var(--multiplier)*27px) 0;
			`;
	}}

	:hover {
		transform: scale(1.2);
	}

	:active {
		transform: translateY(10px);
	}
`;
