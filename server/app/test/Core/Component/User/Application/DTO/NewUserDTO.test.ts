import NewUserDTO from "../../../../../../src/Core/Component/User/Aplication/DTO/NewUserDTO";

describe("NewUserDTO", () => {

	it("should store properly all data", () => {
		expect.assertions(1);
		const validUserWithName = {
			email: "Ms.Jeffrey.Mraz@hotmail.com",
			name: "Jeff",
			password: "LoveDogs1"
		};
		const userDTO = new NewUserDTO(validUserWithName);
		expect(userDTO).toMatchObject(validUserWithName);
	});
});
