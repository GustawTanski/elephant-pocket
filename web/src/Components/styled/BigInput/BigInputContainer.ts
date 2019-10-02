import styled, { css } from "styled-components";
import { positionType } from "../../BigInput";
import { horizontalMobileWritingHeight } from "../../../globals/breakpoints";

export default styled.label<{ position: positionType; htmlFor?: string }>`
	display: flex;
	justify-content: flex-end;
	padding-left: 5vw;
	cursor: pointer;
	width: 45%;
	margin: 0.5em 0;
	align-self: flex-start;

	${({ position }) => {
		if (position != "inLabel") {
			return css`
				pointer-events: none;
			`;
		}
	}}

	${({ htmlFor }) => {
		if (htmlFor == "submit")
			return css`
				height: 0;
				margin: 0;
			`;
	}}
	/* taking input to front when typing in mobiles */
	@media only screen and (max-height: ${horizontalMobileWritingHeight}) and (orientation: landscape) {
		opacity: ${({ position }) => (position == "free" ? 1 : 0)};
	}
`;
