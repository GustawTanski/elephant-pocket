import styled, { css } from "styled-components";

import { firstColor } from "../../cssVariables";
import { mobileLarge } from "../../breakpoints";

export default styled.header`
	background: ${firstColor};
	position: fixed;
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 1rem 5vw;
	align-items: center;
	z-index: 1;

	@media only screen and (min-width: ${mobileLarge}) {
		padding: 1em 21.25px;
	} 
	/* @media only screen and (max-height: 500px) {
		height: 23vh;
	} */
`;
