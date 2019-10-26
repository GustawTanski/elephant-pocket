import Validator, {
	Validatable
} from "../../../../../../lib/ts-extension/src/Validation/Validator";
import UserId from "../../../../SharedKernel/Component/User/Domain/User/UserId";

export interface IUserInput {
	name?: string;
	email: string;
	password: string;
	id?: UserId | string;
}

type IUser = IUserInput & { id: UserId };

export default class User extends Validatable implements IUser {
	@(Validator.string().optional())
	name?: string;

	@Validator.email()
	email: string;

	@Validator.password()
	password: string;

	@Validator.objectRequired()
	id: UserId;

	constructor(base: IUserInput) {
		super();
		const id = this.handleId(base);
		this.validate<typeof User>({ ...base, id });
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
}
