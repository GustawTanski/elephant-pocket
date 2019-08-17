import styled from "styled-components";

import { innerAnchorReset } from "./mixins"
import { decorativeFont } from "../../cssVariables";

export default styled.div`
	font-family: ${decorativeFont};
	font-size: 1.3em;
	cursor: pointer;
	${innerAnchorReset()}

`;
