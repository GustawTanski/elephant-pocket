import AbstractMongooseQueryModel from "../../Services/Model/AbstractMongooseQueryModel";
import User from "../../../../Core/Component/User/Domain/User/User";
import { UserDocument, UserDocumentInput } from "./UserSchema";
import { UserSchema } from "../User";
import { model } from "mongoose";
import UserId from "../../../../Core/SharedKernel/Component/User/Domain/User/UserId";
import AppLogicError from "../../../../Core/SharedKernel/Error/AppLogicError";

export default class UserQueryModel extends AbstractMongooseQueryModel<User, UserDocument> {
	protected Model = model<UserDocument>("User", UserSchema);

	private inputDocument = {} as UserDocumentInput;

	mapToPartialDomainObject({
		_id,
		email,
		password,
		name
	}: Partial<UserDocumentInput>): Partial<User> {
		const id = _id ? new UserId(_id) : undefined;
		return { id, email, password, name };
	}

	mapToHydratedDomainObject(document: UserDocumentInput): User {
		this.inputDocument = document;
		//in case of mongoose provides invalid arguments
		if (this.areArgumentsMissing()) this.throwWrongDocumentError();
		return this.createUser();
	}

	private areArgumentsMissing(): boolean {
		const { _id, email, password } = this.inputDocument;
		return [_id, email, password].some(argument => argument === void 0);
	}

	private throwWrongDocumentError(): never {
		throw new AppLogicError("query returned not enough data to create User");
	}

	private createUser(): User {
		const { _id, email, password, name } = this.inputDocument;
		const id = _id.toString();
		return new User({ id, email, password, name });
	}
}
