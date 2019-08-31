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
			<div style={{ position: "absolute", top: "70vh"}}>
				<BigInput
					type="email"
					name="e-mail"
					placeholder="YOUR EMAIL"
					value={emailValue}
					onChange={onEmailInputChange}
					activePositionY={300}
					spellCheck={false}
					active={false}
				/>
			</div>
		);
	}
}
