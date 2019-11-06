import IUserRepository from "../Repository/UserRepositoryInterface";
import NewUserDTO from "../DTO/NewUserDTO";
import UserDTOMapper from "../DTO/UserDTOMapper";
import IUserService from "../../../../Port/Service/User/UserServiceInterface";
import UserId from "../../../../SharedKernel/Component/User/Domain/User/UserId";
import PersistedUserDTO from "../DTO/PersistedUserDTO";
import UserValidationService from "../Validation/UserValidationService";
import EmptyQueryError from "../../../../Port/Persistence/Error/EmptyQueryError";
import AppRuntimeError from "../../../../SharedKernel/Error/AppRuntimeError";
import IUserSecretCrypter from "../../../../Port/Auth/UserSecretEncoderInterface";
import ILoginDTO from "../../../../Port/Service/User/LoginDTOInterface";
import AuthenticationError from "../../../../Port/Auth/AuthenticationError";
import INewUserDTO from "../../../../Port/Service/User/NewUserDTOInterface";
import IPersistedUserDTO from "../../../../Port/Service/User/PersistedUserDTOInterface";

export default class UserService implements IUserService {
	private repository: IUserRepository;
	private crypter: IUserSecretCrypter;
	constructor(repository: IUserRepository, crypter: IUserSecretCrypter) {
		this.repository = repository;
		this.crypter = crypter;
	}

	async createUser(DTO: NewUserDTO): Promise<void> {
		await this.validateNewUser(DTO);
		const hash = await this.crypter.encrypt(DTO.password);
		DTO = { ...DTO, password: hash };
		const user = UserDTOMapper.toDomainObject(DTO);
		await this.repository.save(user);
	}

	async deleteUser(id: string): Promise<void> {
		this.validateId(id);

		const userId = new UserId(id);
		try {
			await this.repository.findOneById(userId);
			await this.repository.delete(userId);
		} catch (error) {
			this.handleNotExistedUserDeletionAttempt(error);
		}
	}

	private handleNotExistedUserDeletionAttempt(error: any) {
		let newError = error;
		if (error instanceof EmptyQueryError)
			newError = new AppRuntimeError("There is no user with such id!");
		throw newError;
	}

	async findOneById(id: string): Promise<PersistedUserDTO> {
		this.validateId(id);
		const userId = new UserId(id);
		const user = await this.repository.findOneById(userId);
		return UserDTOMapper.toPersistedUserDTO(user);
	}

	async findOneByEmail(email: string): Promise<PersistedUserDTO> {
		this.validateEmail(email);
		const user = await this.repository.findOneByEmail(email);
		return UserDTOMapper.toPersistedUserDTO(user);
	}

	async findAll(): Promise<PersistedUserDTO[]> {
		const users = await this.repository.findAll();
		return users.map(user => UserDTOMapper.toPersistedUserDTO(user));
	}

	async authenticate(DTO: ILoginDTO): Promise<void> {
		debugger;
		try {
			const { email, password } = DTO;
			this.validateEmail(email);
			const { password: hash } = await this.repository.findOneByEmail(email);
			await this.checkPassword(password, hash);
		} catch (error) {
			this.handleAuthenticateError(error);
		}
	}

	private async checkPassword(password: string, hash: string) {
		const isPasswordCorrect = await this.crypter.compare(password, hash);
		if (!isPasswordCorrect) throw new AuthenticationError("wrong password");
	}

	private handleAuthenticateError(error: any) {
		let newError = error;
		if (this.isErrorExpectedToAuthenticate(error))
			newError = new AuthenticationError("wrong email or password");
		throw newError;
	}

	private isErrorExpectedToAuthenticate(
		error: any
	): error is EmptyQueryError | AuthenticationError {
		return error instanceof EmptyQueryError || error instanceof AuthenticationError;
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

	private validateEmail(email: string): void {
		UserValidationService.validateEmail(email);
	}

	private validateWithId(input: IPersistedUserDTO): void {
		UserValidationService.validateAll(input);
	}

	private validateId(id: string): void {
		UserValidationService.validateId(id);
	}
}
