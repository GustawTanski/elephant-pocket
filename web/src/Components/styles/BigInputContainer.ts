import styled, { css } from "styled-components";
import { positionType } from "../BigInput";

export default styled.label<{ position: positionType }>`
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
`;
