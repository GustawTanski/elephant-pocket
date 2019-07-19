import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ILinkInfo } from "../interfaces";
import underlineFocus from "../Atoms/underlineFocus";

export interface ILinkElementProps {
	link: ILinkInfo;
	className?: string;
	bgColor?: string;
	special?: boolean;
}

export default (props: ILinkElementProps): React.ReactElement => {
	const { link, ...stylingProps } = props;
	return (
		<StyledLink {...stylingProps}>
			<Link to={link.url}>{link.name}</Link>
		</StyledLink>
	);
};

const StyledLink = styled.li<{ special?: boolean; bgColor?: string }>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 42px;
	width: 138px;
	font-size: 1.5rem;
	overflow: hidden;
	transition: transform 0.5s;

	${props => {
		if (!props.special) return "";
		else
			return `
			background: ${props.bgColor};
			border-radius: 27px 0 27px 0;
			`;
	}}

	:hover {
		transform: scale(1.2);
	}

	:active {
		transform: translateY(10px);
	}

	a {
		text-decoration: none;
		color: inherit;
		${underlineFocus}
	}
`;
