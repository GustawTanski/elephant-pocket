import React, { Component, createRef, InputHTMLAttributes, PointerEvent } from "react";
import { TweenMax, TimelineMax, Power1 } from "gsap";

import * as S from "./styled";
import { positionType } from "../globals/interfaces&types";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
	position: positionType;
	x: number;
	y: number;
	onLabelPointerUp?: (event: PointerEvent<HTMLLabelElement>) => void;
}
interface State {
	scalingFactor: number;
}

const ABOVE_Y_POSITION = -300;
const TAG_OFF_SCREEN_POSITION = -200;
const IN_LABEL_X_MARGIN = 15;
const SHIFT_DURATION = 0.5;
const TEXT_ALIGN_JUMP_DURATION = 0.3;
const FADING_AWAY_DURATION = 0.15;
const FADING_AWAY_SHIFT = 10;

export default class BigInput extends Component<Props, State> {
	state = { scalingFactor: 0.5 };
	inputRef = createRef<HTMLInputElement>();
	tagRef = createRef<HTMLDivElement>();
	labelRef = createRef<HTMLLabelElement>();
	scale = 1;
	textAlign = "center";
	timeline = new TimelineMax();
	tagTimeline = new TimelineMax();
	labelTop = 0;

	componentDidMount() {
		this.handleInitialPosition();
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		const { x, y, position } = this.props;
		if (prevProps.position != position) {
			this.handleShift();
		}
		if (prevProps.x != x || prevProps.y != y) {
			this.handleResize();
		}
	}

	handleResize() {
		this.setLabelTop();
		const input = this.inputRef.current;
		const tag = this.tagRef.current;
		const { timeline, tagTimeline } = this;
		const active = timeline.getActive() as gsap.Timeline[];
		const activeTag = tagTimeline.getActive() as gsap.Timeline[];
		if (input) {
			if (!active.length) timeline.add(TweenMax.set(input, this.getInputTranslationData()));
			else {
				timeline.clear();
				this.handleInputShift();
			}
		}
		if (tag) {
			if (!activeTag.length) tagTimeline.add(TweenMax.set(tag, this.getTagTranslationData()));
			else {
				tagTimeline.clear();
				this.handleTagShift();
			}
		}
	}

	handleInitialPosition() {
		this.setLabelTop();
		this.handleInputInitialPosition();
		this.handleTagInitialPosition();
	}

	// this method is necessary to handle mobile safari keyboard shift
	setLabelTop() {
		const label = this.labelRef.current;
		if (label) this.labelTop = label.getBoundingClientRect().top;
	}

	handleInputInitialPosition() {
		const { position } = this.props;
		const input = this.inputRef.current;
		if (input) {
			this.setInputProperties();
			const initialPosition = position == "inLabel" ? "inLabel" : "above";
			const { scale, textAlign } = this;
			const translationData = this.getInputTranslationData(initialPosition);
			TweenMax.set(input, { scale, textAlign, ...translationData });
			if (position == "free") this.handleShift();
		}
	}

	handleTagInitialPosition() {
		const { position } = this.props;
		const tag = this.tagRef.current;
		if (tag) {
			if (position != "inLabel") {
				const translationData = this.getTagTranslationData();
				TweenMax.set(tag, { ...translationData });
			}
		}
	}

	handleShift() {
		this.setInputProperties();
		this.handleInputShift();
		this.handleTagShift();
	}

	handleInputShift() {
		const { position } = this.props;
		const translationData = this.getInputTranslationData(position);
		const input = this.inputRef.current;
		const { scale, textAlign } = this;
		if (input) {
			this.shiftInput(input, position, scale, translationData, textAlign);
		}
	}

	shiftInput(
		input: HTMLInputElement,
		position: positionType,
		scale: number,
		translationData: { x: number; y: number },
		textAlign: string
	) {
		this.timeline = new TimelineMax();
		if (position == "inLabel") {
			this.timeline
				.to(input, SHIFT_DURATION, { scale, ...translationData, ease: Power1.easeOut })
				.to(input, FADING_AWAY_DURATION, { opacity: 0, x: translationData.x - FADING_AWAY_SHIFT })
				.set(input, { x: translationData.x + FADING_AWAY_SHIFT })
				.to(input, TEXT_ALIGN_JUMP_DURATION, { textAlign, opacity: 1, x: translationData.x });
		} else {
			const currentX = input.getBoundingClientRect().left;
			this.timeline
				.to(input, FADING_AWAY_DURATION, { opacity: 0, x: currentX + FADING_AWAY_SHIFT })
				.set(input, { x: currentX - FADING_AWAY_SHIFT })
				.to(input, TEXT_ALIGN_JUMP_DURATION, { textAlign, opacity: 1, x: currentX })
				.to(input, SHIFT_DURATION, {
					scale,
					...translationData,
					ease: Power1.easeOut,
					onComplete: input.focus.bind(input)
				});
		}
		return this.timeline;
	}

	handleTagShift() {
		const tag = this.tagRef.current;
		this.tagTimeline = new TimelineMax();
		if (tag) {
			const translationData = this.getTagTranslationData();
			this.tagTimeline.to(tag, SHIFT_DURATION + FADING_AWAY_DURATION + TEXT_ALIGN_JUMP_DURATION, {
				...translationData
			});
		}
	}

	setInputProperties() {
		const { position } = this.props;
		const { scalingFactor } = this.state;
		if (position == "inLabel") {
			this.scale = scalingFactor;
			this.textAlign = "left";
		} else {
			this.scale = 1;
			this.textAlign = "center";
		}
	}

	getInputTranslationData(position = this.props.position) {
		const input = this.inputRef.current as HTMLInputElement;
		const inputRect = this.getNonScaledInputRect(input);
		const destination = this.getInputDestination(position);
		// taking in consider current position and size of input
		const transition = {
			// when in label input is not centered
			x: destination.x - (Number(position != "inLabel") && (inputRect.width / 2) * this.scale),
			y: destination.y - (inputRect.height / 2) * this.scale
		};
		return transition;
	}

	getTagTranslationData() {
		if (this.props.position == "inLabel") return { x: 0 };
		const label = this.labelRef.current as HTMLElement;
		const labelRect = label.getBoundingClientRect();
		const destination = {
			x: TAG_OFF_SCREEN_POSITION
		};
		const transition = {
			x: destination.x - labelRect.right
		};
		return transition;
	}

	getNonScaledInputRect(input: HTMLInputElement) {
		const initialWidth = input.getBoundingClientRect().width;
		TweenMax.set(input, { scale: 1 });
		const inputRect = input.getBoundingClientRect();
		const initialScale = initialWidth / inputRect.width;
		TweenMax.set(input, { scale: initialScale });
		return inputRect;
	}

	getInputDestination(position: positionType) {
		const label = this.labelRef.current as HTMLLabelElement;
		const { x, y } = this.props;
		const labelRect = label.getBoundingClientRect();
		switch (position) {
			case "above":
				return {
					x,
					y: ABOVE_Y_POSITION
				};
			case "inLabel":
				return {
					x: labelRect.right + IN_LABEL_X_MARGIN,
					y: this.labelTop + labelRect.height / 2
				};
			case "free":
			default:
				return { x, y };
		}
	}

	onInputPointerDown = (event: PointerEvent<HTMLInputElement>) => {
		if (event.currentTarget.readOnly) {
			event.preventDefault();
		}
	};

	render() {
		const { x, y, position, onLabelPointerUp, ...inputProps } = this.props;
		const { name } = this.props;
		const { inputRef, tagRef, labelRef, onInputPointerDown } = this;
		return (
			<S.BigInput.Container
				htmlFor={name}
				ref={labelRef}
				onPointerUp={onLabelPointerUp}
				onMouseUp={onLabelPointerUp}
				position={position}
			>
				<S.BigInput.Tag ref={tagRef}>{name && name.toUpperCase()}</S.BigInput.Tag>
				<S.BigInput.Input
					{...inputProps}
					readOnly={position != "free"}
					onPointerDown={onInputPointerDown}
					onMouseDown={onInputPointerDown}
					ref={inputRef}
				/>
			</S.BigInput.Container>
		);
	}
}
