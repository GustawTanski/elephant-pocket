import Validator, {
	Validatable
} from "../../../../../../lib/ts-extension/src/Validation/Validator";

export interface INewUserDTO {
	email: string;
	password: string;
	name?: string;
}

export default class NewUserDTO extends Validatable implements INewUserDTO {
	@Validator.email()
	email: string;

	@Validator.string()
	name?: string;

	@Validator.password({ regex: [/[a-z]/, /[A-Z]/, /[0-9]/] })
	password: string;

	constructor(base: INewUserDTO) {
		super();
		this.validate<typeof NewUserDTO>(base);
		this.email = base.email;
		this.name = base.name;
		this.password = base.password;
	}
}
