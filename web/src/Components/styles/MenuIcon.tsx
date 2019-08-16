import styled from "styled-components";
import { Icon } from "react-icons-kit";

import { square } from "./mixins";

export default styled(Icon)`
	transition: transform 0.5s;
	${square("", "inherit")}
	cursor: pointer;
	display: flex !important;
	justify-content: center;
	align-items: center;
`;
