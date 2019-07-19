import { css } from "styled-components";
import { thirdColor, secondColor } from "../cssVariables";

export default css`
    outline: 0;
    position: relative;
	::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: ${secondColor};
		transform: scaleX(0);
        transform-origin: 0;
		transition: transform .3s;
	}

	:focus::after{
		transform: scaleX(1);
	}
`;
