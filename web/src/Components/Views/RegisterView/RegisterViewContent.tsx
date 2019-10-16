import React, { Component } from "react";

import BigForm from "../../BigForm";
import { IInputInfo } from "../../../globals/interfaces&types";

interface State {
	emailValue: string;
	passwordValue: string;
	chapter: string;
	active: string;
}

export default class RegisterViewContent extends Component<{}, State> {
	state = { emailValue: "", passwordValue: "", active: "e-mail", chapter: "e-mail" };

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
		return <BigForm inputs={this.inputs} onSubmitPointerUp={() => alert("submit")} />;
	}
}
