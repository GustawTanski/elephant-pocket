import NewUserDTO from "../../Component/User/Aplication/DTO/NewUserDTO";
import PersistedUserDTO from "../../Component/User/Aplication/DTO/PersistedUserDTO";

export default interface IUserService {
    createUser(DTO: NewUserDTO): Promise<PersistedUserDTO>;
    deleteUser(id: string): Promise<void>;
}
