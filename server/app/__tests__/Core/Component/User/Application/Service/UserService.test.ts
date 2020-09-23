import UserService from "../../../../../../src/Core/Component/User/Aplication/Service/UserService";
import MockedUserRepository from "./MockedUserRepository";
import NewUserDTO from "../../../../../../src/Core/Component/User/Aplication/DTO/NewUserDTO";
import UserValidationService from "../../../../../../src/Core/Component/User/Aplication/Validation/UserValidationService";
import AppRuntimeError from "../../../../../../src/Core/SharedKernel/Error/AppRuntimeError";
import UserId from "../../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId";
import crypter from "../../../../../../lib/ts-extension/src/Encryption/crypter";
import AuthenticationError from "../../../../../../src/Core/Port/Auth/AuthenticationError";
import InvalidArgumentError from "../../../../../../src/Core/SharedKernel/Error/InvalidArgumentError";
import UuidGenerator from "../../../../../../lib/ts-extension/src/Uuid/UuidGenerator";
import EmptyQueryError from "../../../../../../src/Core/Port/Persistence/Error/EmptyQueryError";

const mockedRepo = new MockedUserRepository();
const userService = new UserService(mockedRepo, crypter);

// TODO Password encryption tests

describe("UserService", () => {
	describe("#createUser", () => {
		it("should call ValidationService#validateParams and Repository#save when data is correct", async () => {
			expect.assertions(2);
			const validateParams = spyOn(UserValidationService, "validateParams");
			const save = spyOn(mockedRepo, "save");
			await userService.createUser({ email: "correct-user@gmail.com", password: "Correct123" });
			expect(validateParams).toBeCalled();
			expect(save).toBeCalled();
		});

		it("should throw AppRuntimeError when provided email is occupied", async () => {
			const newUser = new NewUserDTO({ email: "newUser@gmail.com", password: "Correct123" });
			await userService.createUser(newUser);
			await expect(userService.createUser(newUser)).rejects.toBeInstanceOf(AppRuntimeError);
		});

		it("should encrypt password", async () => {
			const newUser = new NewUserDTO({
				email: "Justen.Goyette@gmail.com",
				password: "DogsAwesome123"
			});
			await userService.createUser(newUser);
			const { password: hash } = await mockedRepo.findOneByEmail(newUser.email);
			debugger;
			await expect(crypter.compare(newUser.password, hash)).resolves.toBe(true);
		});
	});

	describe("#deleteUser", () => {
		it("should call ValidationService#validateId and Repository#delete when there is user with provided id", async () => {
			expect.assertions(2);
			const newUser = new NewUserDTO({
				email: "Jennings.Halvorson@gmail.com",
				password: "Dogs123"
			});
			await userService.createUser(newUser);
			const user = await userService.findOneByEmail(newUser.email);
			const deleteUser = spyOn(mockedRepo, "delete");
			const validateId = spyOn(UserValidationService, "validateId");
			await userService.deleteUser(user.id);
			expect(deleteUser).toBeCalled();
			expect(validateId).toBeCalled();
		});

		it("should throw AppRuntimeError if there is no user with provided id", async () => {
			const userId = new UserId().toString();
			await expect(userService.deleteUser(userId)).rejects.toBeInstanceOf(AppRuntimeError);
		});
	});

	describe("#authenticate", () => {
		it("should throw AuthenticationError when email is not in DB", async () => {
			const notRegisteredUser = { email: "Benny.Friesen@hotmail.com", password: "indexinG12" };
			await expect(userService.authenticate(notRegisteredUser)).rejects.toBeInstanceOf(
				AuthenticationError
			);
		});
		it("should throw InvalidArgumentError when email is not valid", async () => {
			const notRegisteredUser = { email: "Benny", password: "indexinG12" };
			await expect(userService.authenticate(notRegisteredUser)).rejects.toBeInstanceOf(
				InvalidArgumentError
			);
		});
		it("should throw AuthenticationError when user is registered but password doesn't match", async () => {
			const newUser = { email: "Lennie.Brakus@hotmail.com", password: "indexinG12" };
			await userService.createUser(newUser);
			await expect(
				userService.authenticate({ email: newUser.email, password: "sad" })
			).rejects.toBeInstanceOf(AuthenticationError);
		});

		it("should not throw when provided email and password are valid and matches", async () => {
			const newUser = { email: "Hulda.Fritsch@yahoo.com", password: "quantifY12" };
			await userService.createUser(newUser);
			await expect(userService.authenticate(newUser)).resolves.toBe(undefined);
		});
	});

	describe("#findOneById", () => {
		it("should throw EmptyQueryError when there is no user with provided id", async () => {
			const id = UuidGenerator.generateAsString();
			await expect(userService.findOneById(id)).rejects.toBeInstanceOf(EmptyQueryError);
		});

		it("should throw InvalidArgumentError when provided id is not a valid id", async () => {
			const invalidId = "not-id";
			await expect(userService.findOneById(invalidId)).rejects.toBeInstanceOf(InvalidArgumentError);
		});

		it("should return matching user when there is user with such id", async () => {
			const newUser = { email: "Anne.Torphy@yahoo.com", password: "Password123", name: "Anne" };
			await userService.createUser(newUser);
			// using different method only for getting user id
			const { id } = await userService.findOneByEmail(newUser.email);
			const persistedUser = await userService.findOneById(id);
			expect(persistedUser).toMatchObject({ email: newUser.email, name: newUser.name });
			expect(persistedUser.id).toBe(id);
		});
	});

	describe("#findOneByEmail", () => {
		it("should throw EmptyQueryError when there is no user with provided email", async () => {
			const email = "Carleton.Powlowski@gmail.com";
			await expect(userService.findOneByEmail(email)).rejects.toBeInstanceOf(EmptyQueryError);
		});

		it("should throw InvalidArgumentError when provided email is not a valid email", async () => {
			const invalidEmail = "not-email";
			await expect(userService.findOneByEmail(invalidEmail)).rejects.toBeInstanceOf(
				InvalidArgumentError
			);
		});

		it("should return matching user when there is user with such email", async () => {
			const newUser = { email: "Brain.Ondricka@yahoo.com", password: "Password123", name: "Brain" };
			await userService.createUser(newUser);
			const { email, name } = newUser;
			const persistedUser = await userService.findOneByEmail(email);
			expect(persistedUser).toMatchObject({ email, name });
		});
	});
});
