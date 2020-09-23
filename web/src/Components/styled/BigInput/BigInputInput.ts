import styled, { css } from "styled-components";
import { firstColor, fourthColor } from "../../../globals/cssVariables";
import { rightRounded } from "../mixins";
import { horizontalMobileWritingHeight } from "../../../globals/breakpoints";

export default styled.input<{ readOnly: boolean; type?: string }>`
	left: 0;
	top: 0;
	position: fixed;
	background: transparent;
	outline: 0;
	border: 0;
	font-family: inherit;
	font-size: 36px;
	color: inherit;
	text-align: left;
	transform-origin: top left;
	width: 100%;
	padding: 0 2.5%;
	overflow: hidden;
	pointer-events: all;
	::placeholder {
		color: inherit;
		opacity: 0.3;
	}
	${({ readOnly }) => {
		if (readOnly) {
			return css`
				cursor: pointer;
				overflow: visible;
			`;
		}
	}}

	${({ type }) => {
		if (type == "submit") {
			return css`
				background-color: ${fourthColor};
				${rightRounded(40)};
				width: unset;
				padding: 0.3em 0.8em;
				cursor: pointer;
				/* pointer-events: none; */
			`;
		}
	}}

    /* taking input to front when typing in mobiles */
    @media only screen and (max-height: ${horizontalMobileWritingHeight}) and (orientation: landscape) {
		z-index: 1;
		background-color: ${({ type }) => (type != "submit" ? firstColor : fourthColor)};
	}
`;
