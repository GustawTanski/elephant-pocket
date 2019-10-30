import Uuid from "../../src/Uuid/Uuid";
import uuidv4 from "uuid/v4";

describe("Uuid", () => {
	it("should accept correct uuid and store it", () => {
		const sampleUuid = uuidv4();
		const uuid = new Uuid(sampleUuid);
		expect(uuid.toString()).toBe(sampleUuid);
	});

	it("should throw an error, when uuid is not correct", () => {
		const notUuid = "notUuid";
		expect(() => new Uuid(notUuid)).toThrowError();
	});

	it("should compare in correct way", () => {
		expect.assertions(2);
		const sampleUuid1 = uuidv4();
		const sampleUuid2 = uuidv4();
		const uuid1 = new Uuid(sampleUuid1);
		const uuid1Prim = new Uuid(sampleUuid1);
		const uuid2 = new Uuid(sampleUuid2);
		expect(uuid1.equals(uuid1Prim)).toBe(true);
		expect(uuid1.equals(uuid2)).toBe(false);
	});
});
