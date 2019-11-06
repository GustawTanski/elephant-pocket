
import ILoginDTO from "./LoginDTOInterface";
import INewUserDTO from "./NewUserDTOInterface";
import IPersistedUserDTO from "./PersistedUserDTOInterface";

export default interface IUserService {
	createUser(DTO: INewUserDTO): Promise<void>;
	deleteUser(id: string): Promise<void>;
	findOneById(id: string): Promise<IPersistedUserDTO>;
	findOneByEmail(email: string): Promise<IPersistedUserDTO>;
	authenticate(DTO: ILoginDTO): Promise<void>;
	findAll(): Promise<IPersistedUserDTO[]>;
}
