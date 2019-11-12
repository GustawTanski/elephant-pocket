import UserId from "../../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId";
import User from "../../../../../../src/Core/Component/User/Domain/User/User";
import UserDTOMapper from "../../../../../../src/Core/Component/User/Aplication/DTO/UserDTOMapper";
import NewUserDTO from "../../../../../../src/Core/Component/User/Aplication/DTO/NewUserDTO";
import PersistedUserDTO from "../../../../../../src/Core/Component/User/Aplication/DTO/PersistedUserDTO";

describe("UserDTOMapper", () => {
	const userWithoutId = {
		email: "Hulda.Legros@gmail.com",
		password: "Regional-Paradigm-Agent",
		name: "Customer"
	};
	const userWithId = { ...userWithoutId, id: new UserId().toString() };
	it("should properly map data from domain user", () => {
		expect.assertions(2);
		const domainUser = new User(userWithId);
		const newUserDTO = UserDTOMapper.toNewUserDTO(domainUser);
		const persistedUserDTO = UserDTOMapper.toPersistedUserDTO(domainUser);
		expect(newUserDTO).toMatchObject(userWithoutId);
		expect(persistedUserDTO).toMatchObject(userWithId);
	});

	it("should properly map from NewUserDTO to User", () => {
		const newUserDTO = new NewUserDTO(userWithoutId);
		const domainUser = UserDTOMapper.toDomainObject(newUserDTO);
		expect(domainUser).toMatchObject(newUserDTO);
	});

	it("should properly map from PersistedUserDTO to User", () => {
		expect.assertions(2);
		const persistedUserDTO = new PersistedUserDTO(userWithId);
		const { name, password, email } = persistedUserDTO;
		const domainUser = UserDTOMapper.toDomainObject(persistedUserDTO);
		expect(domainUser).toMatchObject({
			name,
			password,
			email
		});
		expect(domainUser.id.toString()).toBe(persistedUserDTO.id);
	});
});
