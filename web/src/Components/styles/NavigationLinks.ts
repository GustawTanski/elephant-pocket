import styled, { css } from "styled-components";
import { positionAbsoluteCenter, transitionHelper } from "./mixins";

import LinkContainer from "./LinkContent";
import { rotateIn, rotateOut } from "./keyframes";
import { tablet } from "../../breakpoints";

const mountedStyle = css`
	opacity: 1;
`;
const unmountedStyle = css`
	opacity: 0;
`;

const linkMountedStyle = css`
	transform-origin: top left;
	animation: ${rotateIn} 1s cubic-bezier(0.2, 1, 0.2, 1) both;
`;

const linkUnmountStyle = css`
	transform-origin: 0;
	animation: ${rotateOut} 0.9s cubic-bezier(0.2, 1, 0.2, 1) both;
`;

//prettier-ignore
export default styled.ul<{transitionState?: transitionHelper.transitionStateType;}>`
	list-style: none;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	padding: 0;
	margin: 0;
	height: 70vh;
	opacity: 1;
	transition: opacity 0.5s;
	${positionAbsoluteCenter()};
	position: fixed;
	${transitionHelper.transitionMixin({
		entering: unmountedStyle,
		entered: mountedStyle,
		exiting: unmountedStyle,
		exited: unmountedStyle,
	})}

	${LinkContainer} .anim {
		${transitionHelper.transitionMixin({
			exiting: linkUnmountStyle,
			entered: linkMountedStyle
		})}
	}

	@media only screen and (min-width: ${tablet}) {
		${positionAbsoluteCenter("unset")}
		z-index: 1;
		flex-direction: row;
		height: unset;
		justify-content: space-between;
		font-size: 1rem;
		width: 50vw;
		max-width: 512px;
		min-width: fit-content;
	}
`;
