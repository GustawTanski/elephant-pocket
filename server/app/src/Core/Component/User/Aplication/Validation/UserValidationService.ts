import Validator from "../../../../../../lib/ts-extension/src/Validation/Validator"
import InvalidArgumentError from "../../../../SharedKernel/Error/InvalidArgumentError";
import UuidGenerator from "../../../../../../lib/ts-extension/src/Uuid/UuidGenerator";

interface IUserValidation {
	email: string;
	name?: string;
	password: string;
	[propName: string]: any;
}

export default abstract class UserValidationService {
	static validator = new Validator({
		email: Validator.email(),
		password: Validator.password({ regex: [/[a-z]/, /[A-Z]/, /[0-9]/] }),
		name: Validator.string()
	});

	static validateId(id: string) {
		if (!UuidGenerator.validate(id))
			throw new InvalidArgumentError(`Provided id: ${id} is not a valid UserId!`);
	}

	static validateEmail(email: string) {
		const { error } = Validator.email().validate(email);
		if (error) throw new InvalidArgumentError(error.details[0].message);
	}

	static validateAll(user: IUserValidation & { id: string }) {
		UserValidationService.validateParams(user);
		UserValidationService.validateId(user.id);
	}

	static validateParams(validatedObject: IUserValidation): void {
		const { error } = this.validator.validate(validatedObject);
		if (error) throw new InvalidArgumentError(error.details[0].message);
	}
}
