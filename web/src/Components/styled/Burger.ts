import styled, { css } from "styled-components";
import { square, rightRounded } from "./mixins";
import MenuIcon from "./MenuIcon";
import * as breakpoint from "../../globals/breakpoints";

import * as CSS from "../../globals/cssVariables";

export default styled.button<{ opened: boolean }>`
	color: inherit;
	border: 0;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	background: transparent;
	${square(39)};
	padding: 0;
	outline: 0;

	::before {
		content: "";
		position: absolute;
		z-index: -1;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: ${CSS.fourthColor};
		${rightRounded(19)}
		will-change: transform;
		transition: transform 0.9s cubic-bezier(0.2, 1, 0.2, 1) 0s;
		pointer-events: none;
	}

	:active ${MenuIcon} {
		transform: translateY(10px);
	}

	${({ opened }) =>
		opened &&
		css`
			::before {
				transform: scale(45);
			}
		`}

	@media only screen and (min-width: ${breakpoint.tablet}) {
		display: none;
	}
`;
