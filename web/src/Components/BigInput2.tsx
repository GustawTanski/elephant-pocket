import React, { Component, createRef, InputHTMLAttributes, PointerEvent } from "react";

import * as S from "./styles";
import { TweenMax } from "gsap";

type positionType = "above" | "free" | "inLabel";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	position: positionType;
	x: number;
    y: number;
    onLabelPointerUp: (event: PointerEvent<HTMLLabelElement>) => void;
}
interface State {
	scalingFactor: number;
}

const ABOVE_Y_POSITION = -300;
const IN_LABEL_X_MARGIN = 30;
const SHIFT_DURATION = 0.5;

export default class BigInput2 extends Component<Props, State> {
	state = { scalingFactor: 0.5 };
	private inputRef = createRef<HTMLInputElement>();
	private tagRef = createRef<HTMLDivElement>();
	private labelRef = createRef<HTMLLabelElement>();
	private scale = 1;
	private textAlign = "center";

	componentDidMount() {
		this.handleInitialPosition();
    }
    
    componentDidUpdate(prevProps: Props, prevState: State) {
        const { x, y, position } = this.props;
        if ( prevProps.x != x || prevProps.y != y || prevProps.position != position) {
            this.handleShift();
        }
    }

	private handleInitialPosition() {
        this.handleInputInitialPosition();
    }

	private handleInputInitialPosition() {
		const { position } = this.props,
			input = this.inputRef.current;
		if (input) {
			this.setInputProperties();
			const initialPosition = position == "inLabel" ? "inLabel" : "above",
				{ scale, textAlign } = this;
			const translationData = this.getInputTranslationData(initialPosition);
			TweenMax.set(input, { scale, textAlign, ...translationData });
			if (position == "free") this.handleShift();
		}
	}

	private handleShift() {
		this.setInputProperties();
		this.handleInputShift();
		this.handleTagShift();
	}

	private handleInputShift() {
        const { position } = this.props;
		const translationData = this.getInputTranslationData(position),
			input = this.inputRef.current as HTMLInputElement,
			{ scale, textAlign } = this;
		TweenMax.to(input, SHIFT_DURATION, { scale, textAlign, ...translationData });
	}

	private handleTagShift() {}

	private setInputProperties() {
		const { position } = this.props,
			{ scalingFactor } = this.state;
		if (position == "inLabel") {
			this.scale = scalingFactor;
			this.textAlign = "left";
		} else {
			this.scale = 1;
			this.textAlign = "center";
		}
	}

	private getInputTranslationData(position = this.props.position) {
        debugger;
		const input = this.inputRef.current as HTMLInputElement;
		const inputRect = input.getBoundingClientRect();
		const destination = this.getInputDestination(position);
		// taking in consider current position and size of input
		const transition = {
			x: destination.x - this.props.x - (inputRect.width / 2) * this.scale,
			y: destination.y - this.props.y - (inputRect.height / 2) * this.scale
		};
		return transition;
	}

	private getInputDestination(position: positionType) {
		const label = this.labelRef.current as HTMLLabelElement,
			{ x, y } = this.props;
		const labelRect = label.getBoundingClientRect();
		switch (position) {
			case "above":
				return {
					x,
					y: ABOVE_Y_POSITION
				};
			case "free":
				return { x, y };
			case "inLabel":
				return {
					x: labelRect.left + IN_LABEL_X_MARGIN,
					y: labelRect.top + labelRect.height / 2
				};
		}
	}

	render() {
		const { position, onLabelPointerUp, ...inputProps } = this.props,
			{ name } = this.props,
			{ inputRef, tagRef, labelRef } = this;
		return (
			<S.BigInputContainer htmlFor={name} ref={labelRef} onPointerUp={onLabelPointerUp}>
				<S.BigInputTag ref={tagRef}>{name}</S.BigInputTag>
				<S.BigInput {...inputProps} ref={inputRef} disabled={position == "inLabel"} />
			</S.BigInputContainer>
		);
	}
}
