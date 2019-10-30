import * as jf from "joiful";
import { AnyClass } from "joiful/core";

interface IPasswordOptions {
	min?: number;
	max?: number;
	regex?: RegExp | RegExp[];
	required?: boolean;
}
export function validateFunc<T extends AnyClass>(
	this: InstanceType<T>,
	base: Partial<T> & { [propName: string]: any },
	Class: T = this.constructor as T
) {
	const { error } = Validator.validateAsClass(base, Class, { allowUnknown: true });
	if (error) throw new Error(error.details[0].message);
}

export abstract class Validatable {
	protected validate<T extends AnyClass>(
		base: Partial<T> & { [propName: string]: any },
		Class: T = this.constructor as T
	) {
		const { error } = Validator.validateAsClass(base, Class, { allowUnknown: true });
		if (error) throw new Error(error.details[0].message);
	}
}

export default class Validator {
	static validateAsClass = jf.validateAsClass;
	static ignore = () => jf.any();
	static string = () => jf.string();
	static objectOptional = () => jf.object().optional();
	static objectRequired = () => jf.object().required();
	static password = ({
		min = 6,
		max = 255,
		regex = /.+/,
		required = true
	}: IPasswordOptions = {}) => {
		let decorator = jf
			.string()
			.min(min)
			.max(max);
		if (regex instanceof Array) {
			decorator = regex.reduce((prev, curr) => prev.regex(curr), decorator);
		} else decorator = decorator.regex(regex);
		if (required) return decorator.required();
		else return decorator;
	};
	static email = () =>
		jf
			.string()
			.email()
			.required();
	static Validatable = Validatable;
}
