import UserService from "../../../../../../src/Core/Component/User/Aplication/Service/UserService";
import MockedUserRepository from "./MockedUserRepository";
import NewUserDTO from "../../../../../../src/Core/Component/User/Aplication/DTO/NewUserDTO";
import UserValidationService from "../../../../../../src/Core/Component/User/Aplication/Validation/UserValidationService";
import AppRuntimeError from "../../../../../../src/Core/SharedKernel/Error/AppRuntimeError";
import UserId from "../../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId";

const mockedRepo = new MockedUserRepository();
const userService = new UserService(mockedRepo);

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
	});

	describe("#deleteUser", () => {
		it("should call ValidationService#validateId and Repository#delete when there is user with provided id", async () => {
			expect.assertions(2);
			const newUser = new NewUserDTO({
				email: "Jennings.Halvorson@gmail.com",
				password: "Dogs123"
			});
			const user = await userService.createUser(newUser);
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
});
