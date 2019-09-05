import React, { Component, createRef, KeyboardEvent, PointerEvent, ChangeEvent } from "react";

import * as S from "./styles";
import { TweenMax, Power1 } from "gsap";

interface Props {
	type?: string;
	placeholder?: string;
	name?: string;
	value?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onPointerUp?: (event: PointerEvent<HTMLLabelElement>) => void;
	onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
	spellCheck?: boolean;
	active: boolean;
}

interface State {
	scalingFactor: number;
	heightInCenterStateFactor: number;
	windowSize: { height: number; width: number };
}

export default class BigInput extends Component<Props, State> {
	state = {
		scalingFactor: 2,
		heightInCenterStateFactor: 0.5,
		windowSize: { height: window.innerHeight, width: window.innerWidth }
	};

	inputRef = createRef<HTMLInputElement>();
	labelRef = createRef<HTMLLabelElement>();
	divRef = createRef<HTMLDivElement>();

	readonly POSITION_OUT_OF_THE_SCREEN = -200;

	componentDidMount() {
		const input = this.inputRef.current,
			span = this.divRef.current;
		if (input) {
			TweenMax.set(input, { ...this.getTranslateData("above") });
			TweenMax.to(input, 0.5, {
				...this.getTranslateData("top"),
				ease: Power1.easeOut,
				onComplete: input.focus.bind(input)
			});
		}
		if (span) {
			TweenMax.set(span, { x: this.POSITION_OUT_OF_THE_SCREEN });
		}
		window.addEventListener("resize", this.onResize);
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		const { active } = this.props,
			input = this.inputRef.current,
			span = this.divRef.current;
		const { windowSize } = this.state;
		if (active !== prevProps.active && input && span) this.handleShift();
		if (
			windowSize.width !== prevState.windowSize.width ||
			windowSize.height !== prevState.windowSize.height
		)
			this.handleResize();
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.onResize);
	}

	handleShift() {
		const input = this.inputRef.current as HTMLInputElement,
			div = this.divRef.current as HTMLSpanElement,
			{ active } = this.props,
			ANIMATION_TIME = .5;
		let { scalingFactor } = this.state;
		if (!active) scalingFactor = 1 / scalingFactor;
		TweenMax.to(input, ANIMATION_TIME, {
			scale: active ? 1 : scalingFactor,
			...this.getTranslateData(active ? "top" : "down", scalingFactor),
			overflow: active ? "hidden" : "visible",
			ease: Power1.easeOut,
			textAlign: "center"
		});
		if (!active) TweenMax.set(input, { delay: .5, textAlign: active ? "center" : "left"});
		TweenMax.to(div, ANIMATION_TIME, {
			x: active ? this.POSITION_OUT_OF_THE_SCREEN : 0
		});
		input.focus();
	}

	handleResize() {
		const input = this.inputRef.current,
			div = this.divRef.current,
			{ active } = this.props;
		if (input) TweenMax.set(input, { ...this.getTranslateData(active ? "top" : "down") });
		if (div) TweenMax.set(div, { x: active ? this.POSITION_OUT_OF_THE_SCREEN : 0 });
	}

	onResize = () => {
		const windowSize = { height: window.innerHeight, width: window.innerWidth };
		this.setState({ windowSize });
	};

	getTranslateData(to: "top" | "down" | "above", scalingFactor: number = 1) {
		const input = this.inputRef.current as HTMLInputElement,
			label = input.parentElement as HTMLElement,
			labelRect = label.getBoundingClientRect(),
			inputRect = input.getBoundingClientRect(),
			{ heightInCenterStateFactor, windowSize } = this.state,
			POSITION_IN_LABEL_FACTOR = 0.73;
		let destination = { x: 0, y: 0 };
		switch (to) {
			case "top":
				destination = {
					x: windowSize.width / 2,
					y: windowSize.height * heightInCenterStateFactor
				};
				break;
			case "above":
				destination = {
					x: windowSize.width / 2,
					y: this.POSITION_OUT_OF_THE_SCREEN
				};
				break;
			case "down":
				destination = {
					x: labelRect.left + POSITION_IN_LABEL_FACTOR * labelRect.width,
					y: labelRect.top + labelRect.height / 2
				};
				break;
		}
		destination.x -= (inputRect.width / 2) * scalingFactor;
		destination.y -= (inputRect.height / 2) * scalingFactor;
		return destination;
	}

	render() {
		const { active, onPointerUp, onKeyDown, ...elementProps } = this.props,
			{ name } = elementProps;
		return (
			<S.BigInputContainer onPointerUp={onPointerUp} ref={this.labelRef} htmlFor={name}>
				<S.BigInputTag ref={this.divRef}>{name && name.toUpperCase()}</S.BigInputTag>
				<S.BigInput
					onKeyDown={onKeyDown}
					ref={this.inputRef}
					{...elementProps}
					disabled={!active}
				/>
			</S.BigInputContainer>
		);
	}
}
