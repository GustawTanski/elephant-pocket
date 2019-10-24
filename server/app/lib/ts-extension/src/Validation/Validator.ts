import * as jf from "joiful";

export default class Validator {
	static validateAsClass = jf.validateAsClass;
	static string = () => jf.string();
	static objectOptional = () => jf.object().optional();
	static objectRequired = () => jf.object().required();
	// TODO better password validation
	static password = () =>
		jf
			.string()
			.min(6)
			.required();
	static email = () =>
		jf
			.string()
			.email()
			.required();
}