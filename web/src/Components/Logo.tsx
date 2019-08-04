import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { decorativeFont } from "../cssVariables";
import underlineFocus from "../Atoms/underlineFocus";

export default (props: any): React.ReactElement => {
	return (
		<LogoText {...props}>
			<Link to="/">Elephant Pocket</Link>
		</LogoText>
	);
};

export const LogoText = styled.div`
	font-family: ${decorativeFont};
	font-size: 9vmin;
	padding-left: 0.5em;
	flex: 1;

	a {
		color: inherit;
		text-decoration: none;
		outline: 0;
		position: relative;
		/* ${underlineFocus} */
	}

	@media only screen and (min-width: 550px) {
		font-size: 48px;
	}
`;
