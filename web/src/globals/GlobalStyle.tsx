import { createGlobalStyle } from "styled-components";

import * as CSS from "./cssVariables";

export default createGlobalStyle`
	:root {
		--mainFont : Open Sans;
		--decorativeFont : Lobster Two;

		--firstColor : #33658a;
		--secondColor : #FDFAD4;
		--thirdColor : #DB4D15;
		--fourthColor : #1B2324;
	}

	body{
		overflow-x: hidden;
		overflow-y: hidden;
		background-color: ${CSS.firstColor};
		height: 100vh;
	}

	*, *::before, *::after {
		box-sizing: border-box;
	}

	html {
		font-family: ${CSS.mainFont}, Helvetica, sans-serif;
		font-size: 18px;
		color: ${CSS.secondColor};
		height: 100%;
	}

	#root {
		height: 100%;
	}
`;
