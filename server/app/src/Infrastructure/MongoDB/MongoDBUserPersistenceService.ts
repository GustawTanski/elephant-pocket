import User from "../../Core/Component/User/Domain/User/User";
import { UserModel, UserMapper, IUserDocument } from "./Model/User";
import IPersistanceServicePort from "../../Core/Port/Persistence/PersistanceServicePort";
import UserId from "../../Core/SharedKernel/Component/User/Domain/User/UserId";
import IQuery from "../../Core/Port/Persistence/QueryPort";
// implements IPersistanceServicePort<User>
export default class MongoDBUserPersistanceService implements IPersistanceServicePort<User> {
	UserModel = UserModel;

	constructor() {}

	private async add(user: User): Promise<IUserDocument> {
		const persistedUser = new this.UserModel(UserMapper.toDocumentProperties(user));
		return await persistedUser.save();
	}

	async save(user: User): Promise<User> {
		let persistedUser = await this.UserModel.findById(user.id.toString());
		if (!persistedUser) persistedUser = await this.add(user);
		else {
			persistedUser.overwrite(UserMapper.toDocumentProperties(user));
			persistedUser = await persistedUser.save();
		}
		return UserMapper.toDomainObject(persistedUser);
	}

	async delete(id: UserId): Promise<User> {
		const deletedUser = await this.UserModel.findByIdAndDelete(id.toString());
		if (!deletedUser) throw this.noIdFoundError();
		else return UserMapper.toDomainObject(deletedUser);
	}

	private noIdFoundError() {
		return Error("There is no user with such id!");
	}

	async findById(id: UserId): Promise<User> {
		let persistedUser = await this.UserModel.findById(id.toString());
		if (!persistedUser) throw this.noIdFoundError();
		else return UserMapper.toDomainObject(persistedUser);
	}

	async findAll(): Promise<User[]> {
		let persistedUsers = await this.UserModel.find();
		return persistedUsers.map(user => UserMapper.toDomainObject(user));
	}

	async findOne(query: IQuery): Promise<User> {
		// TODO
		return new User({ email: "mocked.user@gmail.com", password: "pasWord123~" });
	}
}
