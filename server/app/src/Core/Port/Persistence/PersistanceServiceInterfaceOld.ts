import DomainObject from "../DomainObject";
import IQuery from "./QueryPortInterfaceOld";

export default interface IPersistanceService<T extends DomainObject> {
	save: (entity: T) => Promise<T>;
	delete: (entityId: T["id"]) => Promise<T>;
	findAll: () => Promise<T[]>;
	findById: (entityId: T["id"]) => Promise<T>;
	findByEmail: (email: string) => Promise<T>;
	// TODO Creating IQueryPort
	findOne: (query: IQuery) => Promise<T>;
}
