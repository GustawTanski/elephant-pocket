import styled, { css } from "styled-components";
import { square, rightRounded } from "./mixins";
import * as breakpoint from "../../breakpoints";

import * as CSS from "../../cssVariables";

export default styled.button<{ opened: boolean }>`
	color: inherit;
	border: 0;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	background: transparent;
	${square(39)};
	outline: 0;

	.icon {
		transition: transform 0.5s;
	}

	:active .icon {
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
		background: ${CSS.fourthColor};
		${rightRounded(19)}
		will-change: transform;
		transition: transform 0.9s cubic-bezier(0.2, 1, 0.2, 1) 0s;

		${props => props.opened && css`transform: scale(45)`}
	}

	@media only screen and (min-width: ${breakpoint.tablet}) {
		display: none;
	}
`;
