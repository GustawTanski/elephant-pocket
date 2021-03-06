import styled from "styled-components";

import { firstColor } from "../../globals/cssVariables";
import { mobileLarge, tablet } from "../../globals/breakpoints";

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

	@media only screen and (min-width: ${tablet}) {
		align-items: baseline;
	}
`;
