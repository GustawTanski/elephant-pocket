import PersistedUserDTO from "../../../../../../src/Core/Component/User/Aplication/DTO/PersistedUserDTO";
import UuidGenerator from "../../../../../../lib/ts-extension/src/Uuid/UuidGenerator";

describe("PersistedUserDTO", () => {
	it("should store properly all data", () => {
		expect.assertions(1);
		const validUserWithName = {
			email: "Ms.Jeffrey.Mraz@hotmail.com",
			name: "Jeff",
			password: "LoveDogs1",
			id: UuidGenerator.generateAsString()
		};
		const userDTO = new PersistedUserDTO(validUserWithName);
		expect(userDTO).toMatchObject(validUserWithName);
	});
});
