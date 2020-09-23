import React, { Component } from "react";

import BigForm from "../../BigForm";
import { IInputInfo } from "../../../globals/interfaces&types";

interface State {
	emailValue: string;
	passwordValue: string;
	chapter: string;
	active: string;
	isLoading: boolean;
}

export default class RegisterViewContent extends Component<{}, State> {
	state = {
		emailValue: "",
		passwordValue: "",
		active: "e-mail",
		chapter: "e-mail",
		isLoading: false
	};

	onSubmit = () => {
		this.setState({ isLoading: true });
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 3000);
	};

	inputs: Array<IInputInfo> = [
		{
			type: "e-mail",
			placeholder: "YOUR E-MAIL",
			name: "e-mail"
		},
		{
			type: "password",
			placeholder: "YOUR PASSWORD",
			name: "password"
		}
	];
	render() {
		return (
			<BigForm
				inputs={this.inputs}
				onSubmitPointerUp={this.onSubmit}
				isLoading={this.state.isLoading}
			/>
		);
	}
}
