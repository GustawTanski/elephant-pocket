import styled from "styled-components";

import { innerAnchorReset } from "./mixins"
import { decorativeFont } from "../../globals/cssVariables";
import { fullHD } from "../../globals/breakpoints";

export default styled.div`
	font-family: ${decorativeFont};
	font-size: 1.3em;
	cursor: pointer;
	${innerAnchorReset()}
	@media only screen and (min-width: ${fullHD}) {
		font-size: 1.73em;
	}
`;
