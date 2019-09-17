import styled from "styled-components";
import { horizontalMobileWritingHeight } from "../../../breakpoints";

export default styled.form`
	display: flex;
	flex-direction: column;
	padding-bottom: 5vh;
	position: fixed;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	height: 100%;

	/* taking input to front when typing in mobiles */
	@media only screen and (max-height: ${horizontalMobileWritingHeight}) and (orientation: landscape) {
		z-index: 1000;
	}
`;
