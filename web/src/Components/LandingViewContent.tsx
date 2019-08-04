import React, { Component } from "react";
import styled from "styled-components";

import LinkElement from "./LinkElement";
import LinkInfo from "../Classes/LinkInfo";
import { thirdColor as bgColor } from "../cssVariables";

export default class LandingViewContent extends Component {
	link = new LinkInfo("Try it", "/register");
	render() {
		return (
			<StyledContent>
				<BigText>
					Control <br />
					your <br />
					expenses. <br />
				</BigText>
				<div className="container">
					<BoldParagraph>
						<p className="content">
							Make your budget maintainable as never it have been.
						</p>
					</BoldParagraph>
					<StyledLinkElement link={this.link} special bgColor={bgColor} />
				</div>
			</StyledContent>
		);
	}
}

const desktopBreakpoint = "800px";

const StyledContent = styled.article`
	width: 100%;
	min-height: 100vh;
	padding-top: 10vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow: hidden;

	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	@media only screen and (max-height: 500px) {
		padding-top: 23vh;
	}

	@media only screen and (orientation: landscape) and (min-width: ${desktopBreakpoint}) {
		flex-direction: row;
		align-items: flex-start;
		.container {
			flex-direction: column;
			align-self: flex-end;
		}
	}
`;

const StyledLinkElement = styled(LinkElement)`
	margin: 5vw 0;
	@media only screen and (min-width: 650px) and (max-width: 800px),
		(orientation: portrait) {
		--multiplier: 1.2;
	}
`;

const BigText = styled.div`
	width: 100%;
	font-size: 18vw;
	margin: 5vw 0 7vw;
	font-weight: bold;
	padding: 0 7vw;
	line-height: 17vw;

	@media only screen and (orientation: landscape) and (min-width: ${desktopBreakpoint}) {
		width: 70%;
		font-size: 12vw;
		line-height: 1.2;
		margin: 0;
		padding: 0 4vw;
		margin-top: 1vw;
	}
`;

const BoldParagraph = styled.div`
	padding: 0 7vw;
	width: 100%;
	font-size: 6vw;
	font-weight: bold;

	.content {
		/* max-width: 280px; */
		word-wrap: break-word;
	}

	@media only screen and (orientation: landscape) and (min-width: ${desktopBreakpoint}) {
		font-size: 1.3rem;
		padding: 0 5vw;
	}
`;
