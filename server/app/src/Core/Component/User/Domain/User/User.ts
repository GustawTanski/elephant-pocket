import Validator from "../../../../../../lib/ts-extension/src/Validation/Validator";
import UserId from "../../../../SharedKernel/Component/User/Domain/User/UserId";
import * as jf from "joiful";

export interface IUserInput {
	name?: string;
	email: string;
	password: string;
	id?: UserId | string;
}

type IUser = IUserInput & { id: UserId };

export default class User implements IUser {
	@(Validator.string().optional())
	name?: string;

	@Validator.email()
	email: string;

	@Validator.password()
	password: string;

	@Validator.objectRequired()
	id: UserId;

	constructor(base: IUserInput) {
		const id = this.handleId(base);
		this.validate({ ...base, id });
		this.email = base.email;
		this.password = base.password;
		this.name = base.name;
		this.id = id;
	}

	private handleId(base: IUserInput): UserId {
		let id: UserId;
		if (base.id instanceof UserId) id = new UserId(base.id.toString());
		else id = new UserId(base.id);
		return id;
	}

	private validate(base: IUser) {
		const { error } = Validator.validateAsClass(base, User);
		if (error) throw new Error(error.details[0].message);
	}
}
