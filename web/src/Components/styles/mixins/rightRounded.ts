import { css } from "styled-components";

export default function rightRounded(
	radius: number | string,
	unit: string = "px"
) {
	return css`
		border-radius: ${radius + unit} 0 ${radius + unit} 0;
	`;
}
