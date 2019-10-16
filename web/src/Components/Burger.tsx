import React, { Component, ReactElement, Fragment, cloneElement } from "react";
import { Transition } from "react-transition-group";
import { menu } from "react-icons-kit/feather/menu";
import { x } from "react-icons-kit/feather/x";

import * as S from "./styled";

interface Props {}

interface State {
	opened: boolean;
}
export default class Burger extends Component<Props, State> {
	state: State = { opened: false };

	onClick = () => {
		const { opened } = this.state;
		this.setState({ opened: !opened });
	};
	// TODO:: rewrite this with gsap
	render() {
		const { opened } = this.state;
		const { children } = this.props;
		return (
			<Fragment>
				<S.Burger opened={opened}>
					<S.MenuIcon onClick={this.onClick} icon={!opened ? menu : x} size={20} className="icon" />
				</S.Burger>
				<Transition in={opened} timeout={{ enter: 100, exit: 1000 }} mountOnEnter unmountOnExit>
					{state =>
						cloneElement(children as ReactElement<any>, {
							transitionState: state
						})
					}
				</Transition>
			</Fragment>
		);
	}
}
