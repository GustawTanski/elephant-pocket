import Validator from "../../../../../../lib/ts-extension/src/Validation/Validator";
import InvalidArgumentError from "../../../../SharedKernel/Error/InvalidArgumentError";
import UuidGenerator from "../../../../../../lib/ts-extension/src/Uuid/UuidGenerator";
import AppLogicError from "../../../../SharedKernel/Error/AppLogicError";

interface IUserValidation {
	email: string;
	name?: string;
	password: string;
	[propName: string]: any;
}

export default class UserValidationService implements IUserValidation {
	@Validator.email()
	email: string;

	@Validator.password({ regex: [/[a-z]/, /[A-Z]/, /[0-9]/] })
	password: string;

	@Validator.string()
	name?: string;

	constructor(base: IUserValidation) {
		this.email = base.email;
		this.password = base.password;
		this.name = base.name;
		throw new AppLogicError(
			"This class is for validation purpose only but there was and attempt to instantiate it!"
		);
	}

	static validateId(id: string) {
		if (!UuidGenerator.validate(id))
			throw new InvalidArgumentError(`Provided id: ${id} is not a valid UserId!`);
	}

	static validateAll(user: IUserValidation & { id: string }) {
		UserValidationService.validateParams(user);
		UserValidationService.validateId(user.id);
	}

	static validateParams(validatedObject: IUserValidation): void {
		const { error } = Validator.validateAsClass(validatedObject, UserValidationService);
		if (error) throw new InvalidArgumentError(error.details[0].message);
	}
}
