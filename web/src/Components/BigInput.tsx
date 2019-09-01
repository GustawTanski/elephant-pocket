import React, { Component, createRef, KeyboardEvent, MouseEvent } from "react";

import * as S from "./styles";
import { TweenMax, Power1 } from "gsap";

interface Props {
	type?: string;
	placeholder?: string;
	name?: string;
	value?: string;
	onChange?: (event: any) => void;
	onClick?: () => void;
	spellCheck?: boolean;
}

interface State {
	scalingFactor: number;
	active: boolean;
	centerPositionY: number;
}

export default class BigInput extends Component<Props, State> {
	state = { scalingFactor: 2, active: true, centerPositionY: window.innerHeight / 2 };

	inputRef = createRef<HTMLInputElement>();
	labelRef = createRef<HTMLLabelElement>();
	spanRef = createRef<HTMLSpanElement>();

	componentDidMount() {
		const input = this.inputRef.current,
			span = this.spanRef.current;
		if (input) {
			TweenMax.set(input, { ...this.getTranslateData("above") });
			TweenMax.to(input, 0.5, {
				...this.getTranslateData("top"),
				ease: Power1.easeOut,
				onComplete: input.focus.bind(input)
			});
		}
		if (span) {
			TweenMax.set(span, { x: -200 });
		}
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		const { active } = this.state,
			input = this.inputRef.current,
			span = this.spanRef.current;
		if (active !== prevState.active && input && span) this.handleShift();
	}

	handleShift() {
		const input = this.inputRef.current as HTMLInputElement,
			span = this.spanRef.current as HTMLSpanElement,
			{ active } = this.state;
		let { scalingFactor } = this.state;
		if (!active) scalingFactor = 1 / scalingFactor;
		TweenMax.to(input, 0.5, {
			scale: active ? 1 : scalingFactor,
			...this.getTranslateData(active ? "top" : "down", scalingFactor)
		});
		TweenMax.to(span, 0.5, { x: active ? -span.getBoundingClientRect().right : 0 });
	}

	onEnterClicked = (event: KeyboardEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		if (event.keyCode === 13 && target.value) this.setState({ active: false });
	};

	onPointerUp = (event: MouseEvent<HTMLLabelElement>) => {
		if (!this.state.active) this.setState({ active: true });
	};

	getTranslateData(to: "top" | "down" | "above", scalingFactor: number = 1) {
		const input = this.inputRef.current as HTMLInputElement,
			label = input.parentElement as HTMLElement,
			labelRect = label.getBoundingClientRect(),
			inputRect = input.getBoundingClientRect(),
			{ centerPositionY } = this.state;
		let destination = { x: 0, y: 0 };
		switch (to) {
			case "top":
				destination = {
					x: window.innerWidth / 2,
					y: centerPositionY
				};
				break;
			case "above":
				destination = {
					x: window.innerWidth / 2,
					y: -300
				};
				break;
			case "down":
				destination = {
					x: labelRect.left + 0.6 * labelRect.width,
					y: labelRect.top + labelRect.height / 2
				};
				break;
		}
		destination.x -= (inputRect.width / 2) * scalingFactor;
		destination.y -= (inputRect.height / 2) * scalingFactor;
		return destination;
	}

	render() {
		const { onClick, ...elementProps } = this.props;
		const { name } = elementProps;
		const { active } = this.state;
		return (
			<label
				onPointerUp={this.onPointerUp}
				ref={this.labelRef}
				style={{ width: "100%", position: "relative", display: "block" }}
			>
				<span ref={this.spanRef} style={{ position: "relative", display: "block" }}>
					{name && name.toUpperCase()}
				</span>
				<S.BigInput
					onKeyDown={this.onEnterClicked}
					ref={this.inputRef}
					{...elementProps}
					disabled={!active}
				/>
			</label>
		);
	}
}
