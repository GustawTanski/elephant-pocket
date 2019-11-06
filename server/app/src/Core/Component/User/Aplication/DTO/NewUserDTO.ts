import INewUserDTO from "../../../../Port/Service/User/NewUserDTOInterface";

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
