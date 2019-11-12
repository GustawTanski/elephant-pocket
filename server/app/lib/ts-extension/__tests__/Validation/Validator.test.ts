import Validator from "../../src/Validation/Validator";

describe("Validator", () => {
	describe(".email().validate", () => {
		it("should throw an error when validating wrong email", () => {
			expect(Validator.email().validate("wrong").error).toBeInstanceOf(Error);
		});
		it("should properly validate valid email", () => {
			expect(Validator.email().validate("email@email.com").error).toBeFalsy();
		});
	});
	describe(".email().password", () => {
		it("should throw an error when validating wrong password", () => {
			expect.assertions(3);
			expect(Validator.password({ min: 6 }).validate("wrong").error).toBeInstanceOf(Error);
			expect(Validator.password({ regex: /[a-z]/ }).validate("WRONG123").error).toBeInstanceOf(
				Error
			);
			expect(
				Validator.password({ regex: [/[a-z]/, /[0-9]/] }).validate("WRONG123").error
			).toBeInstanceOf(Error);
		});
		it("should properly validate valid password", () => {
			expect.assertions(3);
			expect(Validator.password({ min: 6 }).validate("correct").error).toBeFalsy();
			expect(Validator.password({ regex: /[a-z]/ }).validate("Correct123").error).toBeFalsy();
			expect(
				Validator.password({ regex: [/[a-z]/, /[0-9]/] }).validate("Correct123").error
			).toBeFalsy();
		});
	});
	describe("instance", () => {
		it("should create working and proper validation", () => {
			expect.assertions(2);
			const validator = new Validator({
				email: Validator.email(),
				password: Validator.password({ regex: /(e|F|k)/ })
			});
			const validationResult = validator.validate({
				email: "Eric.Shields@yahoo.com",
				password: "eMatora"
			});
			expect(validationResult.error).toBeFalsy();
			const abortiveValidationResult = validator.validate({
				email: "dog@dog.dog",
				password: "lomtara"
			});
			expect(abortiveValidationResult.error).toBeInstanceOf(Error);
		});

		it("should properly extend schema", () => {
			const validator = new Validator({
				email: Validator.email()
			});
			validator.appendToSchema({ password: Validator.password() });
			const validationResult = validator.validate({
				email: "Eric.Shields@yahoo.com",
				password: "eMatora"
			});
			expect(validationResult.error).toBeFalsy();
		});
	});
});
