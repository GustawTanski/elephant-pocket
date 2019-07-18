import Button from "./Button";
import styled from "styled-components";

const dim = 39;

interface INavButtonProps {
	className: string;
}

export default styled(Button)`
	width: ${dim}px;
	height: ${dim}px;
	outline: 0;
	font-weight: 700;
	cursor: pointer;

	/* margin: 1em; */
	::before {
		border-radius: 19px 0 19px 0;
		will-change: transform;
		transition: transform 0.9s cubic-bezier(0.2, 1, 0.2, 1) 0s;
	}

	@media only screen and (min-width: 800px) {
		display: none;
	}
`;
