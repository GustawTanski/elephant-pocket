import styled from "styled-components";

interface IButtonProps {
	bg?: string;
}

export default styled.button<IButtonProps>`
	color: inherit;
	border: 0;
	font-size: 1.5rem;
	position: relative;
	text-align: center;
	margin: 0 1em;
	display: flex;
	justify-content: center;
	align-items: center;
	background: transparent;

	::before {
		content: "";
		position: absolute;
		z-index: -1;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: var(--localColor);
	}

	--localColor: var(--${props => (props.bg ? props.bg : "first")}Color);
`;
