import styled, { css } from "styled-components";
import { firstColor, fourthColor } from "../../cssVariables";
import { rightRounded } from "./mixins";

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
                width: fit-content;
                padding: .3em .8em;
                cursor: pointer;
                /* pointer-events: none; */
			`;
		}
	}}

    /* taking input to front when typing in mobiles */
    @media only screen and (max-height: 300px) and (orientation: landscape) {
		z-index: 1000;
		background-color: ${firstColor};
	}
`;
