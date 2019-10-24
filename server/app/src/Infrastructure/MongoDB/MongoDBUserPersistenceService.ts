import User from "../../Core/Component/User/Domain/User/User";
import { UserModel, UserMapper, IUserDocument } from "./Model/User";
import IPersistanceServicePort from "../../Core/Port/Persistence/PersistanceServicePort";

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
}
