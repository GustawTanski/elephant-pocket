import React, { Component } from "react";
import * as S from "./styles";
import BigInput from "./BigInput";


interface State {
	emailValue: string;
}

export default class RegisterViewContent extends Component<{}, State> {
	state = { emailValue: "" };

	onEmailInputChange = ({ target }: { target: HTMLInputElement }) => {
		this.setState({ emailValue: target.value.toUpperCase() });
	};
	render() {
		const { emailValue } = this.state;
		const { onEmailInputChange } = this;
		return (
			<BigInput
				type="email"
				name="email"
				placeholder="YOUR EMAIL"
				value={emailValue}
				onChange={onEmailInputChange}
				spellCheck={false}
			/>
		);
	}
}
