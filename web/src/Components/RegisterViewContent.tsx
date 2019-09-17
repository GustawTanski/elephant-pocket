import React, { Component, KeyboardEvent, PointerEvent, ChangeEvent, ReactElement } from "react";
import * as S from "./styles";

import BigForm, { IInputInfo } from "./BigForm";
import BigInput from "./BigInput";

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
		},
	];
	render() {
		return <BigForm inputs={this.inputs} onSubmitPointerUp={() => alert("submit")} />;
	}
}
