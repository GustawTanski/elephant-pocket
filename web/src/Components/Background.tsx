import React, { Component, ReactChild } from "react";
import { connect } from "react-redux";

import * as S from "./styled";
import { storeType } from "../Redux/store";

interface Props {
	children?: ReactChild;
	xToken: string;
	forceLogin: boolean;
	history: { push: (path: string) => void };
}

class Background extends Component<Props> {
	componentDidMount() {
		const { history, xToken, forceLogin } = this.props;
		if (forceLogin && xToken) history.push("/me");
	}

	render() {
		const { children } = this.props;
		return <S.Background>{children}</S.Background>;
	}
}

function mapStateToProps(store: storeType) {
	return { xToken: store.xToken };
}

export default connect(mapStateToProps)(Background);
