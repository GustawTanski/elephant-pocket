import { Schema, Document, model } from "mongoose";
import User from "../../../Core/Component/User/Domain/User/User";
import UuidGenerator from "../../../../lib/ts-extension/src/Uuid/UuidGenerator";

interface IUserDocumentProperties {
	email: IUserDocument["email"];
	password: IUserDocument["password"];
	name?: IUserDocument["name"];
	_id: IUserDocument["_id"];
}

export interface IUserDocument extends Document {
	email: string;
	password: string;
	name?: string;
	_id: string;
}

export const UserSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: false },
	_id: {
		type: String,
		unique: true,
		required: true,
		validate: {
			validator: UuidGenerator.validate
		}
	}
});

export const UserModel = model<IUserDocument>("User", UserSchema);

export const UserMapper = {
	toDocumentProperties(user: User): IUserDocumentProperties {
		return {
			name: user.name,
			_id: user.id.toString(),
			email: user.email,
			password: user.password
		};
	},
	toDomainObject(user: IUserDocument): User {
		return new User({
			name: user.name,
			id: user._id,
			email: user.email,
			password: user.password
		});
	}
};
