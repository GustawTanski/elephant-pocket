import Uuid from "../../src/Uuid/Uuid";
import uuidv4 from "uuid/v4";


describe("Uuid", () => {
	it("should accept correct uuid and store it", () => {
		const sampleUuid = uuidv4();
		const uuid = new Uuid(sampleUuid);
		expect(uuid.uuid).toBe(sampleUuid);
    });
    
    it("should throw an error, when uuid is not correct", () => {
        const notUuid = "notUuid";
        expect(() => new Uuid(notUuid)).toThrowError();
    })
});
