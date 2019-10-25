import mongoose from "mongoose";
import MongoDBUserPersistanceService from "../../../src/Infrastructure/MongoDB/MongoDBUserPersistenceService";
import User from "../../../src/Core/Component/User/Domain/User/User";
import { UserModel, UserMapper } from "../../../src/Infrastructure/MongoDB/Model/User";
describe("MongoDBUserPersistenceService", () => {
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
	const service = new MongoDBUserPersistanceService();
	it("should create user and save in db when there is no such in db", async () => {
		expect.assertions(4);
		const user = new User({
			name: "Lauryn",
			email: "Stanley.Lueilwitz@gmail.com",
			password: "doggowoofer"
		});
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
		const user = new User({
			name: "Dee",
			email: "Josiane.Lueilwitz@gmail.com",
			password: "overriding"
		});
		await service.save(user);
		user.password = "auxiliary.PNG";
		const userFromDBBeforeService = await UserModel.findById(user.id.toString());
		expect(userFromDBBeforeService).toBeTruthy();
		const userAfterService = await service.save(user);
		expect(userAfterService).toMatchObject(user);
		const userFromDBAfterService = await UserModel.findById(user.id.toString());
		if (userFromDBAfterService) expect(userFromDBAfterService.password).toBe(user.password);
	});

	// TODO delete, findById, findAll
});
