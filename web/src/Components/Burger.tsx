import React, { Component, ReactNode, Fragment } from "react";
import { Icon } from "react-icons-kit";
import { menu } from "react-icons-kit/feather/menu";
import { x } from "react-icons-kit/feather/x";

import * as S from "./styles";

interface Props {
	children?: ReactNode;
}

interface State {
	opened: boolean;
}
export default class NavButton extends Component<Props, State> {
	state: State = { opened: false };

	onClick = () => {
		const { opened } = this.state;
		this.setState({ opened: !opened });
	};
	render() {
		const { opened } = this.state;
		const { children } = this.props;
		return (
			<Fragment>
				<S.NavButton onClick={this.onClick} opened={opened}>
					<Icon icon={!opened ? menu : x} size={20} className="icon" />
				</S.NavButton>
				{children}
			</Fragment>
		);
	}
}
