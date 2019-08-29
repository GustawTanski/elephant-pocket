import styled from "styled-components";
import { innerAnchorReset } from "../mixins";
import { tablet } from "../../../breakpoints";

export default styled.div`
	width: 100%;
	height: 100vh;
	padding: 0 5vw;
	padding-top: 15vh;
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: auto minmax(20px, 10vh) auto auto auto 1fr;
	grid-column: 1;

	${innerAnchorReset()};
	@media only screen and (orientation: landscape) {
		padding: 12vh;
	}
`;
