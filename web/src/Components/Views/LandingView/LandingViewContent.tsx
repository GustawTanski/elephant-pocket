import React, { Component, createRef, ReactNode } from "react";
import { TweenMax } from "gsap";

import * as S from "../../styled";
import { Link } from "react-router-dom";

interface State {
	bigTextLastWord: string;
}

export default class LandingViewContent extends Component<{}, State> {
	state = { bigTextLastWord: "expenses." };

	smallTextRef = createRef<HTMLParagraphElement>();
	bigTextLastLineRef = createRef<HTMLSpanElement>();
	linkContainerRef = createRef<HTMLDivElement>();

	componentDidMount() {
		const smallText = this.smallTextRef.current as HTMLParagraphElement,
			lastLine = this.bigTextLastLineRef.current as HTMLSpanElement,
			linkContainer = this.linkContainerRef.current as HTMLDivElement;
		const delay = this.writingAnimation(lastLine, 0.08);
		this.setChangingBigText();
		const delay2 = this.writingAnimation(smallText, 0.03, delay);

		TweenMax.from(linkContainer, 0.8, { scale: 0, opacity: 0, delay: delay2 });
	}

	componentDidUpdate() {
		const lastLine = this.bigTextLastLineRef.current as HTMLSpanElement;
		this.writingAnimation(lastLine, 0.08);
	}
	setChangingBigText() {
		const possibleLastLines = ["expenses.", "budget.", "life.", "money."];
		let i = 1;
		setInterval(() => {
			this.setState({ bigTextLastWord: possibleLastLines[i] });
			if (i < possibleLastLines.length - 1) i++;
			else i = 0;
		}, 3000);
	}

	wrapCharsInSpans(text: string): ReactNode {
		return [...text].map(char => <span key={Math.random()}>{char}</span>);
	}

	writingAnimation(
		element: HTMLElement,
		timePerLetter: number,
		delay: number = 0
	) {
		[...element.children].forEach((span, i) =>
			TweenMax.from(span, timePerLetter, {
				opacity: 0,
				delay: i * timePerLetter + delay
			})
		);
		return element.children.length * timePerLetter + delay;
	}

	BigText = () => {
		const { wrapCharsInSpans, bigTextLastLineRef } = this;
		const { bigTextLastWord } = this.state;
		return (
			<S.LandingView.BigText>
				Control <br />
				your <br />
				<span ref={bigTextLastLineRef}>
					{wrapCharsInSpans(bigTextLastWord)}
				</span>{" "}
				<br />
			</S.LandingView.BigText>
		);
	}

	SmallText = () => {
		const { smallTextRef, wrapCharsInSpans } = this;
		return (
			<S.LandingView.SmallText ref={smallTextRef}>
				{wrapCharsInSpans(
					"Make your budget maintainable as never it have been."
				)}
			</S.LandingView.SmallText>
		);
	}

	TryItLink = () => {
		const { linkContainerRef } = this;
		return (
			<S.LandingView.LinkContainer ref={linkContainerRef}>
				<Link to="/register">
					<S.LinkContent primary>Try it!</S.LinkContent>
				</Link>
			</S.LandingView.LinkContainer>
		);
	}
	render() {
		return (
			<S.LandingView.Content>
				<this.BigText />
				<this.SmallText />
				<this.TryItLink />
			</S.LandingView.Content>
		);
	}
}
