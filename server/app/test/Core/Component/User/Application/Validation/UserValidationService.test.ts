import UserValidationService from "../../../../../../src/Core/Component/User/Aplication/Validation/UserValidationService";
import InvalidArgumentError from "../../../../../../src/Core/SharedKernel/Error/InvalidArgumentError";
import UserId from "../../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId";
import AppLogicError from "../../../../../../src/Core/SharedKernel/Error/AppLogicError";

describe("UserValidationService", () => {
	it("should throw InvalidArgumentError when wrong id is provided", () => {
		expect(() => UserValidationService.validateId("not-valid-id")).toThrow(InvalidArgumentError);
	});

	it("should throw InvalidArgumentError when wrong email or password provided", () => {
		expect.assertions(2);
		const userWithWrongEmail = {
			email: "notvalid",
			password: "AbsolutelyValid123"
		};
		const userWithWrongPassword = {
			email: "valid@gmail.com",
			password: "invalid"
		};
		expect(() => UserValidationService.validateParams(userWithWrongEmail)).toThrow(
			InvalidArgumentError
		);
		expect(() => UserValidationService.validateParams(userWithWrongPassword)).toThrow(
			InvalidArgumentError
		);
	});

	it("should call .validateParams and .validateId when called .validateAll", () => {
		expect.assertions(2);
		const validateIdSpy = spyOn(UserValidationService, "validateId");
		const validateParamsSpy = spyOn(UserValidationService, "validateParams");
		UserValidationService.validateAll({
			email: "Shea.Rice@gmail.com",
			password: "Tactics123",
			id: new UserId().toString()
		});
		expect(validateIdSpy).toBeCalled();
		expect(validateParamsSpy).toBeCalled();
	});

	it("should throw AppLogicError when there was an attempt to instantiate it", () => {
		const user = { email: "Noemi.Jakubowski@asd.pl", password: "Research12" };
		expect(() => new UserValidationService(user)).toThrow(AppLogicError);
	});
});
