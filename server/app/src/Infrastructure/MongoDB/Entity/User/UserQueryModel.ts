import AbstractMongooseQueryModel from "../../Services/Model/AbstractMongooseQueryModel";
import User from "../../../../Core/Component/User/Domain/User/User";
import { UserDocument, UserDocumentInput } from "./UserSchema";
import { UserSchema } from "../User";
import { model } from "mongoose";
import UserId from "../../../../Core/SharedKernel/Component/User/Domain/User/UserId";
import AppLogicError from "../../../../Core/SharedKernel/Error/AppLogicError";

export default class UserQueryModel extends AbstractMongooseQueryModel<User, UserDocument> {
	protected model = model<UserDocument>("User", UserSchema);

	mapToPartialDomainObject({
		_id,
		name,
		email,
		password
	}: Partial<UserDocumentInput>): Partial<User> {
		return {
			id: _id ? new UserId(_id) : undefined,
			name,
			email,
			password
		};
	}

	mapToHydratedDomainObject({ _id, name, email, password }: UserDocument): User {
		if (typeof _id != "string" || typeof email != "string" || typeof password != "string")
			throw new AppLogicError("query returned not enough data to create User");
		return new User({
			id: _id.toString(),
			name,
			email,
			password
		});
	}
}
