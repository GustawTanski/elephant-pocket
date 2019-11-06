import User from "../../Domain/User/User";
import UserId from "../../../../SharedKernel/Component/User/Domain/User/UserId";

export default interface IUserRepository {
	save: (user: User) => Promise<void>;
	delete: (userId: UserId) => Promise<void>;
	findOneByEmail: (email: string) => Promise<User>;
	findAll: () => Promise<User[]>;
	findOneById: (id: UserId) => Promise<User>;
}