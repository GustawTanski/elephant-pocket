import React, { Component, createRef } from "react";

import * as S from "./styles";
import { BooleanLiteralTypeAnnotation } from "@babel/types";
import { TweenMax } from "gsap";

interface Props {
	type?: string;
	placeholder?: string;
	name?: string;
	active: boolean;
	activePositionY: number;
	value?: string;
	onChange?: (event: any) => void;
	spellCheck?: boolean;
}

interface State {
	scalingFactor: number;
}

export default class BigInput extends Component<Props, State> {
	state = { scalingFactor: 2 }

	inputRef = createRef<HTMLInputElement>();
	labelRef = createRef<HTMLLabelElement>();

	componentDidMount() {
		const input = this.inputRef.current;
		const { active } = this.props;
		if (input) {
			if (active) {
				TweenMax.set(input, { fontSize: "36px "})
			} else {
				TweenMax.set(input, { fontSize: "1rem" })
			}
		}
	}

	getTranslateData(input: HTMLInputElement, active: boolean) {
		const label = input.parentElement as HTMLElement;
		const { height: labelHeight, width: labelWidth, top, left } = label.getBoundingClientRect();
		const { height: inputHeight, width: inputWidth } = input.getBoundingClientRect();
		if (active) {

		} else {
			return { x: 0.65 * labelHeight - }
		}
	}

	render() {
		const { active, ...elementProps } = this.props;
		const { name } = this.props;
		return (
			<label ref={this.labelRef}>
				<span>{name && name.toUpperCase()}</span>
				<S.BigInput ref={this.inputRef} {...elementProps} scalingFactor={0.5} disabled={!active} />
			</label>
		);
	}
}
