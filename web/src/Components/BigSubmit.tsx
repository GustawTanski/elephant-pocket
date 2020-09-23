import React, { Component, createRef, PointerEvent } from "react";

import BigInput, { Props as IInputProps } from "./BigInput";
import { positionType } from "../globals/interfaces&types";

interface Props extends IInputProps {
	x: number;
    y: number;
    position: positionType;
    onPointerUp: (event: PointerEvent<HTMLInputElement>) => void;
}
interface State {}

export default class BigSubmit extends Component<Props, State> {
    state = {};
    private ref = createRef<BigInput>();

	render() {
        const { onPointerUp, ...bigInputProps} = this.props;
		return (
			<BigInput
                {...bigInputProps}
                onMouseUp={onPointerUp}
				type="submit"
				name="submit"
				value="SUBMIT"
				ref={this.ref}
			/>
		);
	}
}
