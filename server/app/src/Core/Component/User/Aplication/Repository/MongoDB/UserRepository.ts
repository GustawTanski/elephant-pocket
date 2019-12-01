import UserRepository from "../UserRepositoryInterface";
import User from "../../../Domain/User/User";
import UserId from "../../../../../SharedKernel/Component/User/Domain/User/UserId";

export default class UserRepositoryImp implements UserRepository {
	async save(user: User): Promise<void> {}
	async delete(userId: UserId): Promise<void> {}
	async findOneByEmail(email: string): Promise<User> {
		return (undefined as unknown) as User;
	}
	async findAll(): Promise<User[]> {
		return (undefined as unknown) as User[];
	}
	async findOneById(id: UserId): Promise<User> {
		return (undefined as unknown) as User;
	}
}
