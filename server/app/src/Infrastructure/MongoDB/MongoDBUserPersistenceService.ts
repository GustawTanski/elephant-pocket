import User from "../../Core/Component/User/Domain/User/User";
import { UserModel, UserMapper, IUserDocument } from "./Model/User";
import IPersistanceService from "../../Core/Port/Persistence/PersistanceServiceInterface";
import UserId from "../../Core/SharedKernel/Component/User/Domain/User/UserId";
import IQuery from "../../Core/Port/Persistence/QueryPortInterface";
import EmptyQueryError from "../../Core/Port/Persistence/Error/EmptyQueryError";
import AppRuntimeError from "../../Core/SharedKernel/Error/AppRuntimeError";

export default class MongoDBUserPersistanceService implements IPersistanceService<User> {
	private UserModel = UserModel;

	constructor() {}

	private async add(user: User): Promise<IUserDocument> {
		const persistedUser = new this.UserModel(UserMapper.toDocumentProperties(user));
		return persistedUser.save();
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
		if (!deletedUser) throw new AppRuntimeError("There is no user witch such id!");
		else return UserMapper.toDomainObject(deletedUser);
	}

	async findById(id: UserId): Promise<User> {
		let persistedUser = await this.UserModel.findById(id.toString());
		if (!persistedUser) throw this.notFoundError("id");
		else return UserMapper.toDomainObject(persistedUser);
	}

	async findAll(): Promise<User[]> {
		let persistedUsers = await this.UserModel.find();
		return persistedUsers.map(user => UserMapper.toDomainObject(user));
	}

	async findByEmail(email: string): Promise<User> {
		let persistedUser = await this.UserModel.findOne({ email: email });
		if (!persistedUser) throw this.notFoundError("email");
		return UserMapper.toDomainObject(persistedUser);
	}

	async findOne(query: IQuery): Promise<User> {
		// TODO
		return new User({ email: "mocked.user@gmail.com", password: "pasWord123~" });
	}

	private notFoundError(parameter: "id" | "email") {
		return new EmptyQueryError(`There is no user with such ${parameter}!`);
	}
}
