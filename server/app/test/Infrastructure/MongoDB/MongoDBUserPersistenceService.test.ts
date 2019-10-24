import mongoose from "mongoose";
import dotenv from "dotenv";
import MongoDBUserPersistanceService from "../../../src/Infrastructure/MongoDB/MongoDBUserPersistenceService";
describe("MongoDBUserPersistenceService", () => {
	beforeAll(async () => {
		dotenv.config();
		const { DB_URI } = process.env;
		if (DB_URI)
			await mongoose.connect(DB_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true
			});
		else throw Error("DB_URI wasn't provided!");
	});
	afterAll(async () => {
		await mongoose.connection.close();
	});
	// TODO All the test
	it("", () => {});
});
