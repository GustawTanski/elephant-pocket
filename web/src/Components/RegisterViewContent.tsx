import React, { Component } from "react";
import * as S from "./styles";
import BigInput from "./BigInput";

interface State {
	emailValue: string;
	active: string;
}

export default class RegisterViewContent extends Component<{}, State> {
	state = { emailValue: "", active: "e-mail" };

	onEmailInputChange = ({ target }: { target: HTMLInputElement }) => {
		this.setState({ emailValue: target.value.toUpperCase() });
	};
	render() {
		const { emailValue, active } = this.state;
		const { onEmailInputChange } = this;
		return (
			<div style={{ position: "absolute", top: "70vh", width: "100%"}}>
				<BigInput
					type="email"
					name="e-mail"
					placeholder="YOUR EMAIL"
					value={emailValue}
					onChange={onEmailInputChange}
					spellCheck={false}
				/>
			</div>
		);
	}
}
