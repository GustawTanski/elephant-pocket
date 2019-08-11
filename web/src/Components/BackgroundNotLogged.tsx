import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { storeType } from "../Redux/store";
import { firstColor } from "../cssVariables";

export interface IBackgroundNotLoggedProps {
	children: ReactNode;
	forceLogin: boolean;
	xToken?: string;
	context: { history: { push: (path: string) => void } };
}

class BackgroundNotLogged extends Component<IBackgroundNotLoggedProps> {
	componentDidMount() {
		const { xToken, forceLogin, context } = this.props;
		if (forceLogin && xToken) context.history.push("/me");
	}
	render(): ReactNode {
		return <StyledBackground>{this.props.children}</StyledBackground>;
	}
}

const StyledBackground = styled.main`
	background: ${firstColor};
	width: 100%;
	min-height: 100vh;
	/* overflow: scroll; */
`;

function mapStateToProps(state: storeType) {
	return { xToken: state.xToken };
}

export default connect(
	mapStateToProps,
	{}
)(BackgroundNotLogged);
