import express from "express";
import request from "supertest";
process.env.JWT_SECRET = "testSecret";

import UserService from "../../../src/Core/Component/User/Aplication/Service/UserService";
import UserRepository from "../../../src/Core/Component/User/Aplication/Repository/MongoDB/UserRepository";
import MongoDBUserPersistanceService from "../../../src/Infrastructure/MongoDB/MongoDBUserPersistenceService";
import crypter from "../../../lib/ts-extension/src/Encryption/crypter";
import { mongoBeforeAll, mongoAfterAll } from "../../Infrastructure/MongoDB/mongoDBTestHelper";
import { UserModel } from "../../../src/Infrastructure/MongoDB/Model/User";
import LoginRESTAPI from "../../../src/UserInterface/REST/Endpoints/Login/LoginRESTAPI";
import jwt from "../../../src/UserInterface/REST/JWT/jwt";

const mongoDBUserPersistanceService = new MongoDBUserPersistanceService();
const userRepository = new UserRepository(mongoDBUserPersistanceService);
const userService = new UserService(userRepository, crypter);
const loginRESTAPI = new LoginRESTAPI(userService);
const app = express();
app.use(express.json());
app.use("/login", loginRESTAPI.router);

const correctPassword = "Correct124";
const correctEmail = "Paulin.Renner@yahoo.com";
const wrongEmail = "wrong-email";
const wrongPassword = "wrong";

describe("LoginRESTAPI", () => {
	describe("POST /login", () => {
		beforeAll(mongoBeforeAll);
		afterAll(mongoAfterAll(UserModel));
		it('should send 400 "Bad Request" when body type is wrong', async () => {
			await userService.createUser({ email: correctEmail, password: correctPassword });
			await request(app)
				.post("/login")
				.send({})
				.expect(400);
			await request(app)
				.post("/login")
				.send({ password: correctPassword })
				.expect(400);
			await request(app)
				.post("/login")
				.send({ email: correctEmail })
				.expect(400);
			await request(app)
				.post("/login")
				.send({ email: correctEmail, password: 25 })
				.expect(400);
			await request(app)
				.post("/login")
				.send({ email: null, password: correctPassword })
				.expect(400);
			await request(app)
				.post("/login")
				.send({ email: correctEmail, password: 25 })
				.expect(400);
			await request(app)
				.post("/login")
				.send({ email: correctEmail, password: correctPassword, extra: "" })
				.expect(400);
		});
		it('should send 400 "Bad Request" when email is not a valid email', async () => {
			await request(app)
				.post("/login")
				.send({ email: wrongEmail, password: correctPassword })
				.expect(400);
		});
		it('should send 400 "Bad Request" when there is no user with provided email', async () => {
			await request(app)
				.post("/login")
				.send({ email: "Billy.Crist@gmail.com", password: correctPassword })
				.expect(400);
		});
		it('should send 400 "Bad Request" when password doesn\'t match hash from DB', async () => {
			const email = "Kian.Olson.III@yahoo.com";
			const password = "Strongpassword123";
			await userService.createUser({ email, password });
			await request(app)
				.post("/login")
				.send({ email, password: "strongpassword321" })
				.expect(400);
		});
		it(`should send 200 "OK" and return valid json web token (and empty body)
        when password and email are correct`, async () => {
			expect.assertions(3);
			const email = "Tillman.Cartwright.DVM@gmail.com";
			const password = "MickeyMouse52";
			await userService.createUser({ email, password });
			// await timer(1000);
			const { id } = await userService.findOneByEmail(email);
			const response = await request(app)
				.post("/login")
				.send({ email, password })
				.expect(200);
			const { "x-auth-token": token } = response.header;
			jwt.verify(token);
			const decodedToken = jwt.decode(token);
			expect(typeof decodedToken).toBe("object");
			expect(decodedToken).toBeTruthy();
			if (decodedToken && typeof decodedToken == "object") {
				expect(decodedToken.id).toBe(id);
			}
		});
	});
});

function timer(time: number): Promise<void> {
	return new Promise<void>(res => {
		setTimeout(res, time);
	});
}
