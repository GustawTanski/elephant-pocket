import IUserRepository from "../Repository/UserRepositoryInterface";

export default class UserService {
	private repository: IUserRepository;
	constructor(repository: IUserRepository) {
		this.repository = repository;
	}

	// createUser()
}
