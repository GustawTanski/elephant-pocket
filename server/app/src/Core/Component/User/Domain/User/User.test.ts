import User from "./User";

describe("User entity", () => {
	it("should create proper object with email and password only", () => {
		const properUser = { email: "Laverna.VonRueden@gmail.com", password: "synthesizing" };
		const user = new User(properUser);
		expect(user).toBeInstanceOf(User);
		expect(user).toMatchObject(properUser);
	});
	it("should throw an error when email or password are not proper", () => {
		const wrongEmailUser = { email: "Dynamic Applications Architect", password: "multi-byte" };
		const wrongPasswordUser = { email: "Towne.Bo@yahoo.com", password: "short" };
		expect(() => new User(wrongEmailUser)).toThrowError();
		expect(() => new User(wrongPasswordUser)).toThrowError();
	});
	it("should accept any string as name", () => {
		const userWithName = {
			email: "Josiane.Schneider@gmail.com",
			password: "primaryCircuit",
			name: "Otilia"
		};
		const user = new User(userWithName);
		expect(user).toBeInstanceOf(User);
		expect(user).toMatchObject(userWithName);
	});
	it("should make exact copies", () => {
		const userWithName = {
			email: "Josiane.Schneider@gmail.com",
			password: "primaryCircuit",
			name: "Otilia"
		};
		const otilia = new User(userWithName);
		const schneider = new User(otilia);
		expect(otilia).toMatchObject(userWithName);
		expect(schneider).toMatchObject(userWithName);
		expect(otilia).not.toBe(schneider);
	});
});
