import MongoDBUserPersistanceService from "../../../../src/Infrastructure/MongoDB/Persistence/MongoDBUserPersistenceService";
import User from "../../../../src/Core/Component/User/Domain/User/User";
import { UserModel, UserMapper } from "../../../../src/Infrastructure/MongoDB/Model/User";
import { mongoBeforeAll, mongoAfterAll } from "../mongoDBTestHelper";
import UserId from "../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId";
import { lauryn, dee, earline, otilia } from "../../../Core/Component/User/Domain/User/sampleUsers";

const service = new MongoDBUserPersistanceService();
describe("MongoDBUserPersistenceService#save", () => {
	beforeAll(mongoBeforeAll);
	afterAll(mongoAfterAll(UserModel));
	it("should create user and save in db when there is no such in db", async () => {
		expect.assertions(4);
		const user = new User(lauryn);
		const userFromDBBeforeService = await UserModel.findById(user.id.toString());
		expect(userFromDBBeforeService).toBeFalsy();
		const userAfterService = await service.save(user);
		expect(userAfterService).toMatchObject(user);
		const userFromDBAfterService = await UserModel.findById(user.id.toString());
		expect(userFromDBAfterService).toBeTruthy();
		if (userFromDBAfterService)
			expect(UserMapper.toDomainObject(userFromDBAfterService)).toMatchObject(user);
	});

	it("should edit user when there he/she is in db", async () => {
		expect.assertions(3);
		let user = new User(dee);
		await service.save(user);

		const { email, name, id } = user;
		user = new User({ email, name, id, password: "auxiliary.PNG" });

		const userFromDBBeforeService = await UserModel.findById(user.id.toString());
		expect(userFromDBBeforeService).toBeTruthy();
		const userAfterService = await service.save(user);
		expect(userAfterService).toMatchObject(user);
		const userFromDBAfterService = await UserModel.findById(user.id.toString());
		if (userFromDBAfterService) expect(userFromDBAfterService.password).toBe(user.password);
	});

	it("should throw an error when new user has same email as any of existing users", async () => {
		const existingUser = new User(earline);
		await service.save(existingUser);
		const newUser = new User({ name: "Stanley", email: earline.email, password: "whatever" });
		await expect(service.save(newUser)).rejects.toBeTruthy();
	});
});

describe("MongoDBUserPersistenceService#delete", () => {
	beforeAll(mongoBeforeAll);
	afterAll(mongoAfterAll(UserModel));
	it("should throw an error when user is missing", async () => {
		expect.assertions(1);
		await expect(service.delete(new UserId())).rejects.toBeTruthy();
	});
	it("should successfully delete user", async () => {
		expect.assertions(2);
		const user = new User(earline);
		await service.save(user);
		await expect(service.delete(user.id)).resolves.toBeTruthy();
		const deletedUserQuery = UserModel.findById(user.id.toString());
		await expect(deletedUserQuery).resolves.toBeFalsy();
	});
});

describe("MongoDBUserPersistenceService#findById", () => {
	beforeAll(mongoBeforeAll);
	afterAll(mongoAfterAll(UserModel));
	it("should throw an error when user is missing", async () => {
		expect.assertions(1);
		await expect(service.findById(new UserId())).rejects.toBeTruthy();
	});

	it("should return user when there is one in db", async () => {
		const user = new User(otilia);
		await service.save(user);
		const userFromDb = await service.findById(user.id);
		expect(userFromDb).toMatchObject(user);
	});
});

describe("MongoDBUserPersistenceService#findAll", () => {
	beforeAll(mongoBeforeAll);
	afterAll(mongoAfterAll(UserModel));
	it("should return empty array when there is no users in db", async () => {
		expect.assertions(2);
		const emptyUserArray = await service.findAll();
		expect(emptyUserArray).toBeInstanceOf(Array);
		expect(emptyUserArray.length).toBe(0);
	});

	it("should return every person in db", async () => {
		expect.assertions(4);
		const userArray = [new User(otilia)];
		await service.save(userArray[0]);
		let userFromDBArray = await service.findAll();
		expect(matchingArraysById(userArray, userFromDBArray)).toBe(true);

		userArray.push(new User(earline));
		await service.save(userArray[1]);
		userFromDBArray = await service.findAll();
		expect(matchingArraysById(userArray, userFromDBArray)).toBe(true);

		userArray.push(new User(lauryn));
		await service.save(userArray[2]);
		userFromDBArray = await service.findAll();
		expect(matchingArraysById(userArray, userFromDBArray)).toBe(true);

		userArray.push(new User(dee));
		await service.save(userArray[3]);
		userFromDBArray = await service.findAll();
		expect(matchingArraysById(userArray, userFromDBArray)).toBe(true);
	});
});

function matchingArraysById(users: User[], uFD: User[]): boolean {
	const usersFromDB = [...uFD];
	return users.every(user => {
		const userFromDB = usersFromDB.find(
			userFromDB => userFromDB.id.toString() == user.id.toString()
		);
		if (!userFromDB) return false;
		usersFromDB.splice(usersFromDB.indexOf(userFromDB), 1);
		return true;
	});
}
