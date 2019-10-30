import IUserRepository from "../UserRepositoryInterface";
import User from "../../../Domain/User/User";
import IPersistanceServicePort from "../../../../../Port/Persistence/PersistanceServicePort";
import UserId from "../../../../../SharedKernel/Component/User/Domain/User/UserId";

export default class UserRepository implements IUserRepository {
	private persistanceService: IPersistanceServicePort<User>;

	constructor(persistanceService: IPersistanceServicePort<User>) {
		this.persistanceService = persistanceService;
	}
	async save(user: User): Promise<void> {
		await this.persistanceService.save(user);
		return;
	}

	async delete(id: UserId): Promise<void> {
		await this.persistanceService.delete(id);
		return;
	}

	findOneByEmail(email: string): Promise<User> {
		return this.persistanceService.findByEmail(email);
	}

	findOneById(id: UserId): Promise<User> {
		return this.persistanceService.findById(id);
	}

	findAll(): Promise<User[]> {
		return this.persistanceService.findAll();
	}

	// findOneByEmail(email: string): Promise<User>{
	// 	console.error("Not yet ")
	// }
}
