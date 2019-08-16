import styled from "styled-components";
import { innerAnchorReset } from "./mixins"

export default styled.div<{ primary?: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 42px;
	width: 138px;
	font-size: 1.5rem;
	overflow: hidden;
	transition: transform 0.5s;
	${innerAnchorReset()};

	:hover {
		transform: scale(1.2);
	}

	:active {
		transform: translateY(10px);
	}
`;
