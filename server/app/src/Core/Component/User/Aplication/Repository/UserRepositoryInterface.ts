import User from "../../Domain/User/User";

export default interface IUserRepository {
	add: (user: User) => void;
	remove: (user: User) => void;
    findOneByEmail: (email: string) => User;
    findAll: () => User[];
}
