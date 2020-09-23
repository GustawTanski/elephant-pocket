import TypeChecker from "../../../src/UserInterface/REST/TypeChecker/TypeChecker";
import InvalidArgumentError from "../../../src/Core/SharedKernel/Error/InvalidArgumentError";

const typeChecker = new TypeChecker();

describe("TypeChecker", () => {
	describe("#checkEmptyObject", () => {
		it("should throw InvalidArgumentError when argument isn't object", () => {
			expect(() => typeChecker.checkEmptyObject("not object")).toThrow(InvalidArgumentError);
		});
		it("should throw InvalidArgumentError when argument is object but isn't empty", () => {
			expect(() => typeChecker.checkEmptyObject({ unexpected: true })).toThrow(
				InvalidArgumentError
			);
		});
		it("should return true when argument is an empty object", () => {
			expect(typeChecker.checkEmptyObject({})).toBe(true);
		});
	});
	describe("#checkString", () => {
		it("should throw InvalidArgumentError when argument isn't string", () => {
			expect.assertions(3);
			expect(() => typeChecker.checkString(243, "243")).toThrow(InvalidArgumentError);
			expect(() => typeChecker.checkString(undefined, "undefined")).toThrow(InvalidArgumentError);
			expect(() => typeChecker.checkString({}, "{}")).toThrow(InvalidArgumentError);
		});
		it("should return true when argument is a string", () => {
			expect(typeChecker.checkString("string", "string")).toBe(true);
		});
	});

	describe("#checkStringOrUndefined", () => {
		it("should throw InvalidArgumentError when argument isn't string or undefined", () => {
			expect.assertions(3);
			expect(() => typeChecker.checkStringOrUndefined(243, "243")).toThrow(InvalidArgumentError);
			expect(() => typeChecker.checkStringOrUndefined(null, "null")).toThrow(InvalidArgumentError);
			expect(() => typeChecker.checkStringOrUndefined([], "[]")).toThrow(InvalidArgumentError);
		});
		it("should return true when argument is a string", () => {
			expect(typeChecker.checkStringOrUndefined("string", "string")).toBe(true);
		});

		it("should return true when argument is undefined", () => {
			expect(typeChecker.checkStringOrUndefined(undefined, "nothing")).toBe(true);
		});
	});
});
