export const SET_TOKEN = "SET_TOKEN";

interface ISetTokenAction {
	type: typeof SET_TOKEN | string;
	token: string;
}

export type TokenAction = ISetTokenAction;
