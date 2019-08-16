import React, { Component, ReactNode } from "react";

import Burger from "./Burger";
import NavigationLinks from "./NavigationLinks";
import * as breakpoints from "../breakpoints";

interface State {
	pageWidth: number;
}

interface Props {}

export default class Navigation extends Component<Props, State> {
	state = { pageWidth: window.innerWidth };
	onResize = () => {
		this.setState({ pageWidth: window.innerWidth });
	};

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

	didWindowPassedBreakpoint(
		breakpoint: number,
		oldWidth: number,
		newWidth: number
	): boolean {
		const wasWiderOrEqualToBreakpoint = oldWidth - breakpoint >= 0;
		const isWiderOrEqualToBreakpoint = newWidth - breakpoint >= 0;
		return wasWiderOrEqualToBreakpoint !== isWiderOrEqualToBreakpoint;
	}
	createRender(): ReactNode {
		const { pageWidth } = this.state;
		const isWiderThanPhone = pageWidth >= Number.parseInt(breakpoints.tablet);
		if (!isWiderThanPhone)
			return (
				<Burger>
					<NavigationLinks />
				</Burger>
			);
		else return null;
	}

	render(): ReactNode {
		return this.createRender();
	}
}
