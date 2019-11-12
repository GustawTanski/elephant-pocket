import CustomError from "../../src/Error/CustomError";

class TestError extends CustomError {}

describe("CustomError", () => {
	it("should work well with instanceof type guard", () => {
		expect.assertions(4);
		try {
			throw new TestError();
		} catch (error) {
			expect(error instanceof TestError).toBe(true);
			expect(error instanceof CustomError).toBe(true);
			expect(error instanceof Error).toBe(true);
			expect(error).toBeInstanceOf(TestError);
		}
	});

	it("should have proper name property", () => {
		try {
			throw new TestError();
		} catch (error) {
			expect(error.name).toBe(TestError.name);
		}
	});

	it("should properly store a message", () => {
		const message = "Example message!";
		try {
			throw new TestError(message);
		} catch (error) {
			expect(error.message).toBe(message);
		}
	});
});
