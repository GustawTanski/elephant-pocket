import styled from "styled-components";
import { decorativeFont } from "../../cssVariables";

export default styled.div`
	font-family: ${decorativeFont};
	font-size: 9vmin;
	padding-left: 0.5em;
	flex: 1;

	a {
		color: inherit;
		text-decoration: none;
		outline: 0;
		position: relative;
	}

	@media only screen and (min-width: 550px) {
		font-size: 48px;
	}
`;
