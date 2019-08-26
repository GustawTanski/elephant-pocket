import React, { Component } from "react";
import * as S from "./styles";
import { interfaceDeclaration } from "@babel/types";

interface State {
	emailValue: string;
}

export default class RegisterViewContent extends Component {
	state = { emailValue: "" };

	onEmailInputChange = ({ target }: { target: HTMLInputElement }) => {
		this.setState({ emailValue: target.value.toUpperCase() });
	};
	render() {
		const { emailValue } = this.state;
		const { onEmailInputChange } = this;
		return (
			<S.BigInput
				type="email"
				value={emailValue}
				onChange={onEmailInputChange}
			/>
		);
	}
}
