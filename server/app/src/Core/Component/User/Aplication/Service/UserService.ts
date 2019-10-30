import IUserRepository from "../Repository/UserRepositoryInterface";
import NewUserDTO, { INewUserDTO } from "../DTO/NewUserDTO";
import UserDTOMapper from "../DTO/UserDTOMapper";
import IUserService from "../../../../Port/Service/UserServicePort";
import UserId from "../../../../SharedKernel/Component/User/Domain/User/UserId";
import PersistedUserDTO, { IPersistedUserDTO } from "../DTO/PersistedUserDTO";
import UserValidationService from "../Validation/UserValidationService";
import EmptyQueryError from "../../../../Port/Persistence/Error/EmptyQueryError";
import AppRuntimeError from "../../../../SharedKernel/Error/AppRuntimeError";

export default class UserService implements IUserService {
	private repository: IUserRepository;
	constructor(repository: IUserRepository) {
		this.repository = repository;
	}

	async createUser(DTO: NewUserDTO): Promise<PersistedUserDTO> {
		await this.validateNewUser(DTO);
		const user = UserDTOMapper.toDomainObject(DTO);
		await this.repository.save(user);
		return UserDTOMapper.toPersistedUserDTO(user);
	}

	async deleteUser(id: string): Promise<void> {
		this.validateId(id);

		const userId = new UserId(id);
		try {
			await this.repository.findOneById(userId);
			await this.repository.delete(userId);
		} catch (error) {
			if (error instanceof EmptyQueryError)
				throw new AppRuntimeError("There is no user with such id!");
			else throw error;
		}
	}

	private async isEmailTaken(email: string): Promise<boolean> {
		try {
			await this.repository.findOneByEmail(email);
			return true;
		} catch (error) {
			if (error instanceof EmptyQueryError) return false;
			else throw error;
		}
	}

	private async validateNewUser(input: INewUserDTO): Promise<void> {
		UserValidationService.validateParams(input);
		if (await this.isEmailTaken(input.email)) {
			throw new AppRuntimeError(`There is already user registered with email: ${input.email}`);
		}
	}

	private validateWithId(input: IPersistedUserDTO): void {
		UserValidationService.validateAll(input);
	}

	private validateId(id: string): void {
		UserValidationService.validateId(id);
	}
}
