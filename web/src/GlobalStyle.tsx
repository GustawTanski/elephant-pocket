import { createGlobalStyle } from "styled-components";
import { mainFont, secondColor }  from "./cssVariables";

export default createGlobalStyle`
	:root {
		
	}
	*,
	*::before,
	*::after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	html {
		font-family: ${mainFont}, Helvetica, sans-serif;
		font-size: 18px;
		color: ${secondColor};
	}
`;
