import User from "../../Core/Component/User/Domain/User/User";
import { UserModel } from "./models/User";

export default class MongoDBUserPersistanceService {
	UserModel = UserModel;

	constructor() {}

	async add(user: User) {
		const usr = new this.UserModel({
			name: user.name,
			_id: user.id.toScalar(),
			email: user.email,
			password: user.password
		});
		await usr.save();
	}
}
