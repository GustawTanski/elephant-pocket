import styled, { css } from "styled-components";
import { positionAbsoluteCenter, transitionHelper } from "./mixins";

import LinkContainer from "./LinkContainer";
import { rotateIn, rotateOut } from "./keyframes";

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
	${transitionHelper.transitionMixin({
		entering: unmountedStyle,
		entered: mountedStyle,
		exiting: unmountedStyle,
		exited: unmountedStyle,
	})}

	${LinkContainer} a {
		${transitionHelper.transitionMixin({
			exiting: linkUnmountStyle,
			entered: linkMountedStyle
		})}
	}
`;

// const NavList = styled.ul`


// 	@media only screen and (max-height: 450px) {
// 		padding: 20vh 0;
// 	}

// 	@media only screen and (min-width: 800px) {
// 		padding: unset;
// 		height: unset;
// 		position: static;
// 		flex-direction: row;
// 		flex: 1.1;
// 		margin: 0 10px;
// 		&.animated-enter-active
// 			${StyledLinkElement},
// 			&.animated-exit-active
// 			${StyledLinkElement} {
// 			transition: none;
// 			span {
// 				animation: none;
// 			}
// 		}
// 	}
// `;
