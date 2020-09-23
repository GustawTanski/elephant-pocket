import UserRepository from "../UserRepositoryInterface";
import User from "../../../Domain/User/User";
import UserId from "../../../../../SharedKernel/Component/User/Domain/User/UserId";
import PersistenceService from "../../../../../Port/Persistence/PersistenceServicePort";
import { MongoDBQueryBuilderStatic } from "../../../../../Port/Persistence/MongoDB/MongoDBQueryBuilderPort";
import QueryService from "../../../../../Port/Persistence/QueryServicePort";
import { List } from "immutable";
import AppLogicError from "../../../../../SharedKernel/Error/AppLogicError";
import EmptyQueryError from "../../../../../Port/Persistence/Error/EmptyQueryError";

export default class UserRepositoryImp implements UserRepository {
	private persistenceService: PersistenceService<User>;
	private queryBuilder: MongoDBQueryBuilderStatic;
	private queryService: QueryService<User>;

	constructor(
		persistenceService: PersistenceService<User>,
		queryBuilder: MongoDBQueryBuilderStatic,
		queryService: QueryService<User>
	) {
		this.persistenceService = persistenceService;
		this.queryBuilder = queryBuilder;
		this.queryService = queryService;
	}

	async save(user: User): Promise<void> {
		await this.persistenceService.save(user);
	}
	async delete(userId: UserId): Promise<void> {
		await this.persistenceService.delete(userId);
	}
	async findOneByEmail(email: string): Promise<User> {
		return (undefined as unknown) as User;
	}
	async findAll(): Promise<User[]> {
		const query = this.queryBuilder
			.create()
			.hydrate()
			.build();
		const users = await this.queryService.query(query);
		if (this.isListOfUsers(users)) {
			return users.toArray();
		} else throw new AppLogicError("userRepository has received not hydrated user object");
	}

	private isListOfUsers(list: List<User | Partial<User>>): list is List<User> {
		return list.every(el => el instanceof User);
	}
	async findOneById(id: UserId): Promise<User> {
		const query = this.queryBuilder
			.create()
			.where("_id")
			.equals(id.toString())
			.hydrate()
			.build();
		const users = await this.queryService.query(query);
		if (users.size == 0) throw new EmptyQueryError("no user found with provided id");
		const user = users.last({} as Partial<User>);
		if (user instanceof User) return user;
		else throw undefined;
	}
}
