import { css } from "styled-components";

export default function innerAnchorReset() {
	return css`
		a {
			color: inherit;
			text-decoration: none;
			outline: 0;
			position: relative;
		}
	`;
}
