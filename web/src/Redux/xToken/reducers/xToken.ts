import { SET_TOKEN, TokenAction } from "../types";

export default function xToken(state: string = "", action: TokenAction) {
	switch (action.type) {
		case SET_TOKEN:
			return action.token;
		default:
			return state;
	}
}
