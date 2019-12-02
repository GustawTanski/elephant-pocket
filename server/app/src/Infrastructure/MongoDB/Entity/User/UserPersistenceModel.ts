import AbstractMongoosePersistenceModel from "../../Services/Model/AbstractMongoosePersistenceModel";
import User from "../../../../Core/Component/User/Domain/User/User";
import { UserDocument, UserSchema, UserDocumentInput } from "./UserSchema";
import { model } from "mongoose";

export default class UserPersistenceModel extends AbstractMongoosePersistenceModel<
	User,
	UserDocument
> {
	protected Model = model<UserDocument>("User", UserSchema);

	mapToDocument(user: User): UserDocument {
		return new this.Model(this.mapToDocumentProperties(user));
	}

	mapToDocumentProperties({ name, id, email, password }: User): UserDocumentInput {
		const _id = id.toString();
		return {
			name,
			_id,
			email,
			password
		};
	}
}
