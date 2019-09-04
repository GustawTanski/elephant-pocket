import React, { Component, KeyboardEvent, PointerEvent, ChangeEvent, ReactElement } from "react";
import * as S from "./styles";
// import BigInput from "./BigInput";
import BigInput from "./BigInput2";

interface State {
	emailValue: string;
	passwordValue: string;
	chapter: string;
	active: string;
}

export default class RegisterViewContent extends Component<{}, State> {
	state = { emailValue: "", passwordValue: "", active: "e-mail", chapter: "e-mail" };
	cursor: number = 0;

	onEmailInputChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
		this.cursor = Number(currentTarget.selectionEnd);
		this.setState({ emailValue: currentTarget.value.toUpperCase() }, this.setCaret(currentTarget));
	};

	onPasswordInputChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
		this.setState({ passwordValue: currentTarget.value });
	};

	setCaret(input: HTMLInputElement) {
		const cursor = this.cursor;
		return () => {
			input.setSelectionRange(cursor, cursor);
		};
	}

	onEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.keyCode == 13 && event.currentTarget.value) {
			const { chapter } = this.state;
			switch (chapter) {
				case "e-mail":
					this.setState({ active: "password", chapter: "password" });
					break;
				case "password":
					this.setState({ active: "", chapter: "end" });
					break;
				case "end":
					this.setState({ active: "" });
			}
		}
	};

	onBigInputPointerUp = ({ currentTarget }: PointerEvent<HTMLLabelElement>) => {
		if (this.state.active != currentTarget.htmlFor)
			this.setState({ active: currentTarget.htmlFor });
	};

	createRender() {
		const children = [],
			{ emailValue, passwordValue, active, chapter } = this.state,
			{ onEmailInputChange, onPasswordInputChange, onBigInputPointerUp, onEnterKeyDown } = this;
		switch (chapter) {
			case "end":
			case "password":
				children[1] = (
					<BigInput
						type="password"
						name="password"
						placeholder="YOUR PASSWORD"
						value={passwordValue}
						onChange={onPasswordInputChange}
						onLabelPointerUp={onBigInputPointerUp}
						onKeyDown={onEnterKeyDown}
						spellCheck={false}
						y={100}
						x={window.innerWidth/2}
						// active={active == "password"}
						position={active == "password" ? "free" : "inLabel"}
					/>
				);
			case "e-mail":
				children[0] = (
					<BigInput
						type="text"
						name="e-mail"
						placeholder="YOUR EMAIL"
						value={emailValue}
						onChange={onEmailInputChange}
						onLabelPointerUp={onBigInputPointerUp}
						onKeyDown={onEnterKeyDown}
						spellCheck={false}
						y={100}
						x={window.innerWidth / 2}
						// active={active == "e-mail"}
						position={active == "e-mail" ? "free" : "inLabel"}
					/>
				);
				break;
		}
		return children;
	}
	render() {
		return <S.RegisterView.Content>{this.createRender()}</S.RegisterView.Content>;
	}
}
