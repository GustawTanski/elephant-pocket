import Joi, {
	SchemaMap,
	Schema,
	ObjectSchema,
	StringSchema,
	AnySchema,
	ValidationResult
} from "@hapi/joi";

interface IPasswordOptions {
	min?: number;
	max?: number;
	regex?: RegExp | RegExp[];
	required?: boolean;
}

interface IOptionFunction {
	(...args: any[]): Schema;
}

interface IValidatableOptionFunction<T> extends IOptionFunction {
	validate: (value: T) => ValidationResult<T>;
}

interface IOptionMap {
	[key: string]: IOptionFunction;
}

export default class Validator {
	private schema: ObjectSchema;

	constructor(optionMap: IOptionMap) {
		const schema: SchemaMap = this.translateOptionMapToSchemaMap(optionMap);
		this.schema = Joi.object(schema);
	}

	validate(value: any) {
		return this.schema.validate(value);
	}

	appendToSchema(optionMap: IOptionMap) {
		const schema = this.translateOptionMapToSchemaMap(optionMap);
		this.schema = this.schema.append(schema);
	}

	private translateOptionMapToSchemaMap(optionMap: IOptionMap): SchemaMap {
		let schemaMap: SchemaMap = {};
		for (let item in optionMap) {
			this.translateOptionToSchema(optionMap, schemaMap, item);
		}
		return schemaMap;
	}

	private translateOptionToSchema(optionMap: IOptionMap, schema: SchemaMap, item: string): void {
		schema[item] = optionMap[item]();
	}

	static email(): IValidatableOptionFunction<string> {
		return this.makeValidatable<string>(() =>
			Joi.string()
				.email()
				.required()
		);
	}

	static string(): IValidatableOptionFunction<string> {
		return this.makeValidatable<string>(() => Joi.string());
	}

	static password({
		min = 6,
		max = 255,
		regex = /.+/,
		required = true
	}: IPasswordOptions = {}): IValidatableOptionFunction<string> {
		let schema = Joi.string()
			.min(min)
			.max(max);
		if (regex instanceof Array) {
			schema = this.addRegexArrayToStringSchema(schema, regex);
		} else schema = schema.regex(regex);
		if (required) schema = this.makeSchemaRequired(schema);
		return this.makeValidatable<string>(() => schema);
	}

	private static makeValidatable<T>(func: IOptionFunction): IValidatableOptionFunction<T> {
		const newFunction = func as IValidatableOptionFunction<T>;
		newFunction.validate = function validate<T>(value: T) {
			return func().validate(value);
		};
		return newFunction;
	}

	private static makeSchemaRequired<T extends AnySchema>(schema: T) {
		return schema.required();
	}

	private static addRegexArrayToStringSchema(schema: StringSchema, regex: RegExp[]): StringSchema {
		return (schema = regex.reduce((prev, curr) => prev.regex(curr), schema));
	}
}
