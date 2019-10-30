export interface INewUserDTO {
	email: string;
	password: string;
	name?: string;
}

export default class NewUserDTO implements INewUserDTO {
	email: string;
	name?: string;
	password: string;

	constructor(base: INewUserDTO) {
		this.email = base.email;
		this.name = base.name;
		this.password = base.password;
	}
}
