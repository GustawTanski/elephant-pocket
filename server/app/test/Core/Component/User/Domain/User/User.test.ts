import User from "../../../../../../src/Core/Component/User/Domain/User/User";
import UserId from "../../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId";
import UuidGenerator from "../../../../../../lib/ts-extension/src/Uuid/UuidGenerator";

describe("User entity", () => {
	const userWithName = {
		email: "Josiane.Schneider@gmail.com",
		password: "primaryCircuit",
		name: "Otilia"
	};
	it("should create proper object with email and password only", () => {
		expect.assertions(2);
		const properUser = { email: "Laverna.VonRueden@gmail.com", password: "synthesizing" };
		const user = new User(properUser);
		expect(user).toBeInstanceOf(User);
		expect(user).toMatchObject(properUser);
	});
	it("should throw an error when email or password are not proper", () => {
		expect.assertions(2);
		const wrongEmailUser = { email: "Dynamic Applications Architect", password: "multi-byte" };
		const wrongPasswordUser = { email: "Towne.Bo@yahoo.com", password: "short" };
		expect(() => new User(wrongEmailUser)).toThrowError();
		expect(() => new User(wrongPasswordUser)).toThrowError();
	});
	it("should accept any string as name", () => {
		expect.assertions(2);
		const user = new User(userWithName);
		expect(user).toBeInstanceOf(User);
		expect(user).toMatchObject(userWithName);
	});
	it("should make exact copies", () => {
		expect.assertions(3);
		const otilia = new User(userWithName);
		const schneider = new User(otilia);
		expect(otilia).toMatchObject(userWithName);
		expect(schneider).toMatchObject(userWithName);
		expect(otilia).not.toBe(schneider);
	});

	it("should create valid UserId when nothing is provided", () => {
		const user = new User(userWithName);
		expect(user.id).toBeInstanceOf(UserId);
	});

	it("should create valid UserId when string uuid is provided", () => {
		const uuid = UuidGenerator.generateAsString();
		const user = new User({ ...userWithName, id: uuid });
		expect(user.id).toBeInstanceOf(UserId);
		expect(user.id.toString()).toBe(uuid);
	});

	it("should copy provided UserId", () => {
		const userId = new UserId();
		const user = new User({ ...userWithName, id: userId });
		const secondUser = new User(user);
		expect(user.id.toString()).toBe(userId.toString());
		expect(user.id).not.toBe(userId);
		expect(user.id.toString()).toBe(secondUser.id.toString());
		expect(user.id).not.toBe(secondUser.id);
	});

	it("should throw an error when wrong uuid string provided", () => {
		expect(() => new User({ ...userWithName, id: "not-uuid" })).toThrowError();
	});
});
