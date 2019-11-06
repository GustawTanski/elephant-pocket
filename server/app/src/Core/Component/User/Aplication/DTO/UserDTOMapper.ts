import NewUserDTO from "./NewUserDTO";
import PersistedUserDTO from "./PersistedUserDTO";
import User from "../../Domain/User/User";

function toDomainObject(DTO: NewUserDTO | PersistedUserDTO) {
	return new User(DTO);
}

function toNewUserDTO(user: User) {
	return new NewUserDTO(user);
}

function toPersistedUserDTO({ name, password, email, id }: User) {
	return new PersistedUserDTO({ name, password, email, id: id.toString() });
}

export default {
	toDomainObject,
	toNewUserDTO,
	toPersistedUserDTO
};
