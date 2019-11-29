import express from "express";
import request from "supertest";
process.env.JWT_SECRET = "testSecret";

import UserRESTAPI from "../../../src/UserInterface/REST/Endpoints/UserRESTAPI";
import UserService from "../../../src/Core/Component/User/Aplication/Service/UserService";
import UserRepository from "../../../src/Core/Component/User/Aplication/Repository/MongoDB/UserRepository";
import MongoDBUserPersistanceService from "../../../src/Infrastructure/MongoDB/Entity/MongoDBUserPersistenceService";
import crypter from "../../../lib/ts-extension/src/Encryption/crypter";
import { mongoBeforeAll, mongoAfterAll } from "../../Infrastructure/MongoDB/Services/mongoDBTestHelper";
import { UserModel } from "../../../src/Infrastructure/MongoDB/Entity/User";
import UuidGenerator from "../../../lib/ts-extension/src/Uuid/UuidGenerator";
import jwt from "../../../src/UserInterface/REST/JWT/jwt";
import EmptyQueryError from "../../../src/Core/Port/Persistence/Error/EmptyQueryError";

const mongoDBUserPersistanceService = new MongoDBUserPersistanceService();
const userRepository = new UserRepository(mongoDBUserPersistanceService);
const userService = new UserService(userRepository, crypter);
const userRESTAPI = new UserRESTAPI(userService);
const app = express();
app.use(express.json());
app.use("/user", userRESTAPI.router);

const correctPassword = "Correct124";
const correctEmail = "Pauline.Renner@yahoo.com";
const wrongEmail = "wrong-email";
const wrongPassword = "wrong";

describe("UserRESTAPI", () => {
	describe("POST /user", () => {
		beforeAll(mongoBeforeAll);
		afterAll(mongoAfterAll(UserModel));

		it('should send 400 "Bad Request" when req.body type is wrong', async () => {
			await userService.createUser({ email: correctEmail, password: correctPassword });
			await request(app)
				.post("/user")
				.send({})
				.expect(400);
			await request(app)
				.post("/user")
				.send({ email: correctEmail })
				.expect(400);
			await request(app)
				.post("/user")
				.send({ password: correctPassword })
				.expect(400);
			await request(app)
				.post("/user")
				.send({ email: 4, password: correctPassword })
				.expect(400);
			await request(app)
				.post("/user")
				.send({ email: correctEmail, password: [] })
				.expect(400);
			await request(app)
				.post("/user")
				.send({ email: correctEmail, password: correctPassword, name: 502 })
				.expect(400);
			await request(app)
				.post("/user")
				.send({ email: correctEmail, name: "", password: correctPassword, extra: null })
				.expect(400);
		});

		it('should send 400 "Bad Request" when req.body.email is not a valid email', async () => {
			await request(app)
				.post("/user")
				.send({ email: wrongEmail, password: correctPassword })
				.expect(400);
		});

		it(`should send 400 "Bad Request" when req.body.password is not valid`, async () => {
			await request(app)
				.post("/user")
				.send({ email: correctEmail, password: wrongPassword })
				.expect(400);
		});

		it(`should send 400 "Bad Request" when sent email is occupied by other user`, async () => {
			const email = "Sandy.Torphy@gmail.com";
			const password = correctPassword;
			await request(app)
				.post("/user")
				.send({ email, password })
				.expect(200);
			await request(app)
				.post("/user")
				.send({ email, password })
				.expect(400);
		});

		it(`should send 200 "OK" when req.body is valid (and there is no user with such email)
        and new user with matching email and name and with valid id`, async () => {
			expect.assertions(3);
			const email = "Rex.Torphy@gmail.com";
			const name = "Rex";
			const response = await request(app)
				.post("/user")
				.send({ email, name, password: correctPassword })
				.expect(200);
			expect(response.body).toMatchObject({ email, name });
			expect(typeof response.body.id).toBe("string");
			expect(UuidGenerator.validate(response.body.id)).toBe(true);
		});

		it('should add user to database when 200 "OK"', async () => {
			expect.assertions(2);
			const email = "Carroll.Marks@hotmail.com";
			const response = await request(app)
				.post("/user")
				.send({ email, password: correctPassword })
				.expect(200);
			const { id } = response.body;
			const { email: emailFromDB, id: idFromDB } = await userService.findOneById(id as string);
			expect(emailFromDB).toBe(email);
			expect(idFromDB).toBe(id);
		});

		it('should return valid json web token with correct id when 200 "OK"', async () => {
			expect.assertions(4);
			const email = "Curt.Konopelski@gmail.com";
			const password = correctPassword;
			const response = await request(app)
				.post("/user")
				.send({ email, password })
				.expect(200);
			const { id } = response.body;
			const { "x-auth-token": token } = response.header;
			expect(typeof token).toBe("string");
			const tokenBody = jwt.decode(token as string);
			expect(typeof tokenBody).toBe("object");
			if (typeof tokenBody != "string" && tokenBody) {
				expect(tokenBody).toHaveProperty("id");
				if (tokenBody.id) {
					expect(tokenBody.id).toBe(id);
				}
			}
		});

		it("should accept 2 users with same names and password but with different emails", async () => {
			const email1 = "Kenny.Lang@gmail.com";
			const email2 = "Kenny.O'Kon@gmail.com";
			const name = "Kenny";
			const password = correctPassword;
			await request(app)
				.post("/user")
				.send({ name, password, email: email1 })
				.expect(200);
			await request(app)
				.post("/user")
				.send({ name, password, email: email2 })
				.expect(200);
		});
	});

	describe("GET /user", () => {
		beforeAll(mongoBeforeAll);
		afterAll(mongoAfterAll(UserModel));
		it("should return an array", async () => {
			const { body } = await request(app)
				.get("/user")
				.expect(200);
			expect(body).toBeInstanceOf(Array);
		});

		it("should return all users stored in DB", async () => {
			expect.assertions(8);
			const user1 = {
				email: "Maymie.Halvorson@gmail.com",
				name: "Maymie",
				password: correctPassword
			};
			const user2 = {
				email: "Lucio.Schneider@yahoo.com",
				name: "Lucio",
				password: correctPassword
			};
			await userService.createUser(user1);
			await userService.createUser(user2);
			const { body } = await request(app)
				.get("/user")
				.expect(200);
			if (body instanceof Array) {
				const returnedUser1 = body.find(user => user.email == user1.email);
				const returnedUser2 = body.find(user => user.email == user2.email);
				expect(returnedUser1).toBeTruthy();
				expect(returnedUser1).toMatchObject({ email: user1.email, name: user1.name });
				expect(typeof returnedUser1.id).toBe("string");
				expect(UuidGenerator.validate(returnedUser1.id)).toBe(true);
				expect(returnedUser2).toBeTruthy();
				expect(returnedUser2).toMatchObject({ email: user2.email, name: user2.name });
				expect(typeof returnedUser2.id).toBe("string");
				expect(UuidGenerator.validate(returnedUser2.id)).toBe(true);
			}
		});
	});

	describe("GET user/:id", () => {
		beforeAll(mongoBeforeAll);
		afterAll(mongoAfterAll(UserModel));
		it('should send 404 "Not Found" when id param is invalid but no such user is registered', async () => {
			const id = UuidGenerator.generateAsString();
			await request(app)
				.get(`/user/${id}`)
				.expect(404);
		});
		it('should send 400 "Bad Request" when id param is invalid', async () => {
			await request(app)
				.get("/user/bad-id")
				.expect(400);
		});

		it('should send 200 "OK" and return user from DB when id param is correct', async () => {
			const email = "Brycen.Beahan@gmail.com";
			const name = "Brycen";
			const password = correctPassword;
			await userService.createUser({ email, name, password });
			const { id } = await userService.findOneByEmail(email);
			const { body } = await request(app)
				.get(`/user/${id}`)
				.expect(200);
			expect(body).toMatchObject({ email, name, id });
		});
	});
	describe("DELETE /user/:id", () => {
		beforeAll(mongoBeforeAll);
		afterAll(mongoAfterAll(UserModel));
		it('should send 404 "Not Found" when id param is invalid but no such user is registered', async () => {
			const id = UuidGenerator.generateAsString();
			await request(app)
				.delete(`/user/${id}`)
				.expect(404);
		});
		it('should send 400 "Bad Request" when id param is invalid', async () => {
			await request(app)
				.delete("/user/bad-id")
				.expect(400);
		});

		it('should send 200 "OK", remove from DB and return user when id param is correct', async () => {
			expect.assertions(2);
			const email = "Casimer.Reichert@gmail.com";
			const name = "Casimer";
			const password = correctPassword;
			await userService.createUser({ email, name, password });
			const { id } = await userService.findOneByEmail(email);
			const { body } = await request(app)
				.delete(`/user/${id}`)
				.expect(200);
			expect(body).toMatchObject({ email, name, id });
			await expect(userService.findOneById(id)).rejects.toBeInstanceOf(EmptyQueryError);
		});
	});
});
