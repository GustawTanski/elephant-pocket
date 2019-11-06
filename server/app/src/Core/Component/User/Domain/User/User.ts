import UserId from "../../../../SharedKernel/Component/User/Domain/User/UserId";

export interface IUserInput {
	name?: string;
	email: string;
	password: string;
	id?: UserId | string;
}

type IUser = IUserInput & { id: UserId };

export default class User implements IUser {
	get name() {
		return this._name;
	}
	get password() {
		return this._password;
	}
	get email() {
		return this._email;
	}
	get id() {
		return this._id;
	}

	constructor(base: IUserInput) {
		const id = this.handleIdType(base.id);
		this._email = base.email;
		this._password = base.password;
		this._name = base.name;
		this._id = id;
	}

	private _name?: string;
	private _email: string;
	private _password: string;
	private _id: UserId;

	private handleIdType(id?: UserId | string): UserId {
		if (id instanceof UserId) return new UserId(id.toString());
		else return new UserId(id);
	}
}
