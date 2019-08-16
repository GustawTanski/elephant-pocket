import styled from "styled-components";

import { firstColor } from "../../cssVariables";

export default styled.header`
	background: ${firstColor};
	position: fixed;
	width: 100%;
	height: 15vh;
	font-size: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 1;

	@media only screen and (max-height: 500px) {
		height: 23vh;
	}
`;
