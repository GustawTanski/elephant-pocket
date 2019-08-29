import styled, { css } from "styled-components";
import { rightRounded } from "./mixins";
import * as CSS from "../../cssVariables";
import { tablet } from "../../breakpoints";

export default styled.div<{ primary?: boolean; secondary?: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 42px;
	width: 138px;
	font-size: 1.5rem;
	overflow: hidden;
	transition: transform 0.5s;
	cursor: pointer;

	${({ primary, secondary }) =>
		(primary ||
		secondary) &&
		css`
			${rightRounded(30)}
		`}
	${({ primary }) =>
		primary &&
		css`
			background: ${CSS.thirdColor};
		`}

	${({ secondary }) =>
		secondary &&
		css`
			background: ${CSS.fourthColor};
		`}

	:active {
		transform: translateY(10px);
	}

	@media only screen and (min-width: ${tablet}) {
		/* font-size: 1rem; */
	}
`;
