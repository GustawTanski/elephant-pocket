import Validator from "../../../../../../lib/ts-extension/src/Validation/Validator"

export interface IUser {
    name?: string;
    email: string;
    password: string;
}

export default class User implements IUser {
	@Validator.string()
	name?: string;

	@(Validator
		.string()
		.email()
		.required())
	email: string;

	@(Validator
		.string()
		.required()
		.min(6))
	password: string;
    
    constructor(base: IUser) {
        this.validate(base);
        this.email = base.email;
        this.password = base.password;
        this.name = base.name;
    }

    private validate(base: IUser) {
        const { error } = Validator.validateAsClass(base, User);
        if (error) throw new Error(error.details[0].message);
    }

}

