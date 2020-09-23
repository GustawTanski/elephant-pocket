import React, { Component } from "react";

import Burger from "./Burger";
import NavigationLinks from "./NavigationLinks";
import * as breakpoints from "../globals/breakpoints";

interface State {
	pageWidth: number;
}

interface Props {}

export default class Navigation extends Component<Props, State> {
	state = { pageWidth: window.innerWidth };

	shouldComponentUpdate(prevProps: Props, prevState: State): boolean {
		const tabletWidth = Number.parseInt(breakpoints.tablet);
		// checking if window's width passed through tablet breakpoint
		const tabletWidthPassed = this.didWindowPassedBreakpoint(
			tabletWidth,
			prevState.pageWidth,
			this.state.pageWidth
		);
		return tabletWidthPassed;
	}

	componentDidMount() {
		window.addEventListener("resize", this.onResize);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.onResize);
	}

	didWindowPassedBreakpoint(breakpoint: number, oldWidth: number, newWidth: number): boolean {
		const wasWiderOrEqualToBreakpoint = oldWidth - breakpoint >= 0;
		const isWiderOrEqualToBreakpoint = newWidth - breakpoint >= 0;
		return wasWiderOrEqualToBreakpoint !== isWiderOrEqualToBreakpoint;
	}
	createRender() {
		const { pageWidth } = this.state;
		const isWiderThanPhone = pageWidth >= Number.parseInt(breakpoints.tablet);
		if (!isWiderThanPhone)
			return (
				<Burger>
					<NavigationLinks isWide={false} />
				</Burger>
			);
		else return <NavigationLinks isWide={true} />;
	}

	onResize = () => {
		this.setState({ pageWidth: window.innerWidth });
	};

	render() {
		return this.createRender();
	}
}
