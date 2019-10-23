import { Schema, Document, model } from "mongoose";

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
	_id: { type: String, required: true, unique: true }
});

export const UserModel = model<IUserDocument>("User", UserSchema);
