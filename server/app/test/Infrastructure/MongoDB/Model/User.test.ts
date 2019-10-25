import mongoose from "mongoose";

import { UserModel, UserMapper } from "../../../../src/Infrastructure/MongoDB/Model/User";
import UuidGenerator from "../../../../lib/ts-extension/src/Uuid/UuidGenerator";
import User from "../../../../src/Core/Component/User/Domain/User/User";

describe("User mongoDB model", () => {
	beforeAll(async () => {
		const { MONGO_URL } = process.env;
		if (MONGO_URL)
			await mongoose.connect(MONGO_URL, {
				useNewUrlParser: true,
				useUnifiedTopology: true
			});
		else throw Error("MONGO_URL wasn't provided!");
	});
	afterAll(async () => {
		await mongoose.connection.close();
	});

	const validUserInput = {
		name: "Dunder",
		email: "Miller.XML@gmail.com",
		password: "maleladnepieski",
		_id: UuidGenerator.generateAsString()
	};

	it("should throw validation error where there is no data or _id is wrong", async () => {
		expect.assertions(2);
		const userWithoutData = new UserModel();
		const userWithWrongId = new UserModel({ ...validUserInput, _id: "not-uuid" });
		await expect(userWithoutData.validate()).rejects.toBeTruthy();
		await expect(userWithWrongId.validate()).rejects.toBeTruthy();
	});
	it("should save a user", () => {
		expect.assertions(3);
		const user = new UserModel(validUserInput);
		const spy = spyOn(user, "save");
		user.save();
		expect(spy).toHaveBeenCalled();
		expect(user).toMatchObject(validUserInput);
		expect(user.email).toBe(validUserInput.email);
	});

	it("should map to user document input properly", async () => {
		expect.assertions(2);
		const validDomainUserInput = {
			email: "cross-platform-matrix@yahoo.com",
			password: "imhacker123",
			name: "dancer",
			id: UuidGenerator.generateAsString()
		};
		const domainObjectUser = new User(validDomainUserInput);
		const mappedToDocumentInputUserInput = UserMapper.toDocumentProperties(domainObjectUser);
		const userDocument = new UserModel(mappedToDocumentInputUserInput);
		await expect(userDocument.validate()).resolves.toBeUndefined();
		expect(userDocument).toMatchObject({
			email: validDomainUserInput.email,
			password: validDomainUserInput.password,
			_id: validDomainUserInput.id,
			name: validDomainUserInput.name
		});
	});

	it("should map document to user properly", () => {
		const userDocument = new UserModel(validUserInput);
		const domainObjectUser = UserMapper.toDomainObject(userDocument);
		expect(domainObjectUser).toMatchObject({
			name: userDocument.name,
			email: userDocument.email,
			password: userDocument.password
		});
		expect(domainObjectUser.id.toString()).toBe(userDocument._id);
	});
});
