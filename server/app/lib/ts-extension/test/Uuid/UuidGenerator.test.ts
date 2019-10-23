import validate from "uuid-validate";
import UuidGenerator from "../../src/Uuid/UuidGenerator";
import Uuid from "../../src/Uuid/Uuid";

describe("UuidGenerator", () => {
	it("should generate valid uuid", () => {
		const uuid = UuidGenerator.generateAsString();
		expect(validate(uuid)).toBe(true);
	});

	it("should generate Uuid object", () => {
		const uuid = UuidGenerator.generate();
		expect(uuid).toBeInstanceOf(Uuid);
		expect(validate(uuid.toString())).toBe(true);
	});
});
