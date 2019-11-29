import UserId from "../../../../SharedKernel/Component/User/Domain/User/UserId";

export interface UserInput {
	name?: User["name"];
	email: User["email"];
	password: User["password"];
	id?: User["id"] | string;
}

export default class User {
	private _name?: string;
	private _email: string;
	private _password: string;
	private _id: UserId;

	get name(): string | undefined {
		return this._name;
	}
	get password(): string {
		return this._password;
	}
	get email(): string {
		return this._email;
	}
	get id(): UserId {
		return this._id;
	}

	constructor(base: UserInput) {
		const id = this.handleIdType(base.id);
		this._email = base.email;
		this._password = base.password;
		this._name = base.name;
		this._id = id;
	}

	private handleIdType(id?: UserId | string): UserId {
		if (id instanceof UserId) return new UserId(id.toString());
		else return new UserId(id);
	}
}
