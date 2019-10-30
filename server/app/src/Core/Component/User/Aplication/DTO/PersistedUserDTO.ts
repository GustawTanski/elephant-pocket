export interface IPersistedUserDTO {
	email: string;
	name?: string;
	password: string;
	id: string;
}

export default class PersistedUserDTO implements IPersistedUserDTO {
	email: string;
	password: string;
	name?: string;
	id: string;

	constructor(base: IPersistedUserDTO) {
		this.email = base.email;
		this.password = base.password;
		this.name = base.name;
		this.id = base.id;
	}

}
