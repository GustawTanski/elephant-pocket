import React, {
	Component,
	FormHTMLAttributes,
	ChangeEvent,
	PointerEvent,
	KeyboardEvent,
	FormEvent
} from "react";
import { List } from "immutable";

import BigInput from "./BigInput";
import BigSubmit from "./BigSubmit";
import { positionType, IInputInfo } from "../globals/interfaces&types";
import * as S from "./styled";

interface Props {
	inputs: Array<IInputInfo>;
	onSubmitPointerUp: (event: PointerEvent<HTMLInputElement>) => void;
}
interface State {
	activeIndex: number;
	windowWidth: number;
	windowHeight: number;
	values: List<string>;
	onScreenArray: List<boolean>;
}

export default class BigForm extends Component<Props, State> {
	state = {
		activeIndex: 0,
		windowHeight: window.innerHeight,
		windowWidth: window.innerWidth,
		values: List<string>(),
		onScreenArray: List<boolean>([true])
	};
	private cursor = 0;

	componentDidMount() {
		window.addEventListener<"resize">("resize", this.onResize);
	}

	componentWillUnmount() {
		window.removeEventListener<"resize">("resize", this.onResize);
	}

	onResize = () => {
		const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
		this.setState({ windowWidth, windowHeight });
	};

	onLabelPointerDownCreator(index: number) {
		return (event: PointerEvent<HTMLLabelElement>) => {
			const { values, activeIndex } = this.state;
			if (activeIndex != index && values.get<string>(activeIndex, "")) {
				this.setState({ activeIndex: index });
			}
		};
	}

	setCaret(input: HTMLInputElement) {
		const cursor = this.cursor;
		return () => {
			input.setSelectionRange(cursor, cursor);
		};
	}

	onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		const { onScreenArray, activeIndex, values } = this.state;
		const { inputs } = this.props;
		if (event.keyCode == 13 && values.get<string>(activeIndex, "")) {
			if (activeIndex + 1 == inputs.length || onScreenArray.get<boolean>(activeIndex + 1, false)) {
				this.setState({ activeIndex: -1 });
			} else {
				this.setState({
					activeIndex: activeIndex + 1,
					onScreenArray: onScreenArray.set(activeIndex + 1, true)
				});
			}
		}
	}

	mapPropsToBigInputs() {
		const { inputs } = this.props;
		return inputs.map(this.createBigInput);
	}

	onChangeCreator(index: number, type: string) {
		const { values } = this.state;
		return (event: ChangeEvent<HTMLInputElement>) => {
			const { currentTarget } = event;
			const { value, selectionEnd } = currentTarget;
			if (type == "password") this.setState({ values: values.set(index, value) });
			else {
				this.cursor = Number(selectionEnd);
				this.setState(
					{ values: values.set(index, value.toUpperCase()) },
					this.setCaret(currentTarget)
				);
			}
		};
	}

	getInputPosition(index: number): positionType {
		const { activeIndex, onScreenArray } = this.state;
		const onScreen = onScreenArray.get<boolean>(index, false);
		let result: positionType;
		if (!onScreen) result = "above";
		else result = index == activeIndex ? "free" : "inLabel";
		return result;
	}

	createBigInput = (input: IInputInfo, index: number) => {
		const { windowWidth, windowHeight, values } = this.state;
		return (
			<BigInput
				{...input}
				x={windowWidth / 2}
				y={windowHeight / 2}
				position={this.getInputPosition(index)}
				spellCheck={false}
				key={input.name}
				value={values.get<string>(index, "")}
				onChange={this.onChangeCreator(index, input.type)}
				onLabelPointerUp={this.onLabelPointerDownCreator(index)}
				onKeyDown={this.onKeyDown.bind(this)}
			/>
		);
	};

	onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	render() {
		const { onSubmitPointerUp } = this.props;
		const { windowHeight, windowWidth, activeIndex } = this.state;
		return (
			<S.RegisterView.Content onSubmitCapture={this.onSubmit}>
				{this.mapPropsToBigInputs()}
				<BigSubmit
					x={windowWidth / 2}
					y={windowHeight / 2}
					position={activeIndex == -1 ? "free" : "above"}
					onPointerUp={onSubmitPointerUp}
				/>
			</S.RegisterView.Content>
		);
	}
}
