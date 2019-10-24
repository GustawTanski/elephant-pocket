import AbstractUuidId from "../../src/Identity/AbstractUuidId";
import UuidGenerator from "../../src/Uuid/UuidGenerator";
import Uuid from "../../src/Uuid/Uuid";
import validate from "uuid-validate";

class TestUserId extends AbstractUuidId {}

describe("AbstractUuidId descendant", () => {
	it("should store valid uuid where no argument is provided to constructor", () => {
		const userId = new TestUserId();
		expect(validate(userId.toString())).toBe(true);
	});
	it("should create proper uuid when string is provided", () => {
		const uuid = UuidGenerator.generateAsString();
		const userId = new TestUserId(uuid);
		expect(validate(userId.toString())).toBe(true);
	});
	it("should throw when provided uuid string is invalid", () => {
		const uuid = "not-uuid";
		expect(() => new TestUserId(uuid)).toThrowError();
		expect(() => new TestUserId("")).toThrowError();
	});
	it("should accept Uuid object", () => {
		const userId = new TestUserId(UuidGenerator.generate());
		expect(validate(userId.toString())).toBe(true);
	});
});
