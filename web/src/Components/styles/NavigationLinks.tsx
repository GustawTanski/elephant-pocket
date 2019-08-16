import styled, { css } from "styled-components";
import { positionAbsoluteCenter, transitionHelper } from "./mixins";

var mountedStyle = css`
	opacity: 1;
`;
var unmountedStyle = css`
	opacity: 0;
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
`;

// const NavList = styled.ul`
// 	top: 0;
// 	left: 0;
// 	list-style: none;
// 	display: flex;
// 	flex-direction: column;
// 	position: absolute;
// 	z-index: -1;
// 	height: 100vh;
// 	width: 100vw;
// 	padding: 30vh 0;
// 	justify-content: space-around;
// 	align-items: center;

// 	&.animated-enter ${StyledLinkElement} {
// 		opacity: 0;
// 	}

// 	&.animated-enter-active ${StyledLinkElement} {
// 		opacity: 1;
// 		transition: opacity 1s;
// 		span {
// 			animation: ${rotateIn} 1.3s 0.1s cubic-bezier(0.2, 1, 0.2, 1) both;
// 			transform-origin: top left;
// 		}
// 	}

// 	&.animated-exit ${StyledLinkElement} {
// 		opacity: 1;
// 	}

// 	&.animated-exit-active ${StyledLinkElement} {
// 		opacity: 0;
// 		/* transition: opacity 1s; */
// 		span {
// 			animation: ${rotateOut} 1s cubic-bezier(0.2, 1, 0.2, 1) both;
// 			transform-origin: 0;
// 		}
// 	}

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
