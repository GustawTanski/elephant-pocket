import { SET_TOKEN, TokenAction } from "./types";


export function setToken(token: string): TokenAction {
	return {
		type: SET_TOKEN,
		token
	};
}