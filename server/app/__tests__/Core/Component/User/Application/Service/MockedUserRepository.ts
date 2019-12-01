import UserRepository from "../../../../../../src/Core/Component/User/Aplication/Repository/UserRepositoryInterface";
import User from "../../../../../../src/Core/Component/User/Domain/User/User";
import UserId from "../../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId";
import EmptyQueryError from "../../../../../../src/Core/Port/Persistence/Error/EmptyQueryError";
import AppRuntimeError from "../../../../../../src/Core/SharedKernel/Error/AppRuntimeError";

export default class MockedUserRepository implements UserRepository {
	async save(user: User): Promise<void> {
		const persistedUserIndex = this.users.findIndex(persistedUser =>
			persistedUser.id.equals(user.id)
		);
		if (~persistedUserIndex) {
			this.users[persistedUserIndex] == user;
		} else {
			this.users.push(user);
		}
		return;
	}

	async delete(id: UserId): Promise<void> {
		const userIndex = this.users.findIndex(user => user.id.equals(id));
		if (~userIndex) throw new AppRuntimeError("there is no user registered with such id");
		else {
			this.users.splice(userIndex, 1);
			return;
		}
	}

	async findOneByEmail(email: string): Promise<User> {
		const user = this.users.find(user => user.email == email);
		if (user) return user;
		else throw new EmptyQueryError("there is no user registered with such email");
	}

	async findAll(): Promise<User[]> {
		return [...this.users];
	}

	async findOneById(id: UserId): Promise<User> {
		const user = this.users.find(user => user.id.toString() == id.toString());
		if (user) return user;
		else throw new EmptyQueryError("there is no user with such id");
	}

	private users = new Array<User>();
}
