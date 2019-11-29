import AbstractMongoosePersistenceModel from "../../Services/Model/AbstractMongoosePersistenceModel";
import User from "../../../../Core/Component/User/Domain/User/User";
import { UserDocument, UserSchema, UserDocumentInput } from "./UserSchema";
import { model } from "mongoose";

export default class UserPersistenceModel extends AbstractMongoosePersistenceModel<
	User,
	UserDocument
> {
	protected model = model<UserDocument>("User", UserSchema);

	mapToDocument(user: User): UserDocument {
		return new this.model(this.mapToDocumentProperties(user));
	}

	mapToDocumentProperties(user: User): UserDocumentInput {
		return {
			name: user.name,
			_id: user.id.toString(),
			email: user.email,
			password: user.password
		};
	}
}
