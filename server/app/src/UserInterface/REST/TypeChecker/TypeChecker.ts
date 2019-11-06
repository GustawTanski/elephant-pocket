import InvalidArgumentError from "../../../Core/SharedKernel/Error/InvalidArgumentError";

export default class TypeChecker {
	public checkEmptyObject(variable: any): variable is {} {
		if (!this.isEmptyObject(variable))
			throw new InvalidArgumentError(
				`unexpected properties: ${this.getStringRepresentationOfKeys(variable)}`
			);
		return true;
	}

	private getStringRepresentationOfKeys(variable: any) {
		const keys = Object.keys(variable);
		const quotedKeys = keys.map(key => `"${key}"`);
		return `[ ${quotedKeys.join(", ")} ]`;
	}
	private isEmptyObject(obj: any): boolean {
		return obj && typeof obj == "object" && Object.keys(obj).length == 0;
	}

	public checkString(variable: any, variableName: string): variable is string {
		if (!(typeof variable == "string")) this.throwInvalidArgumentError(variableName, "string");
		return true;
	}

	public checkStringOrUndefined(
		variable: any,
		variableName: string
	): variable is string | undefined {
		if (!this.isStringOrUndefined(variable))
			this.throwInvalidArgumentError(variableName, "string | undefined");
		return true;
	}

	private isStringOrUndefined(data: any) {
		return data === void 0 || typeof data == "string";
	}

	private throwInvalidArgumentError(propertyName: string, typeName: string) {
		throw new InvalidArgumentError(`"${propertyName}" must be a "${typeName}"`);
	}
}
