import IObjectWithId from "../ObjectWithId";
import IQuery from "./QueryPort";

export default interface IPersistanceServicePort<T extends IObjectWithId> {
	save: (entity: T) => Promise<T>;
	delete: (entityId: T["id"]) => Promise<T>;
	findAll: () => Promise<T[]>;
	findById: (entityId: T["id"]) => Promise<T>;
	// TODO Creating IQueryPort
	findOne: (query: IQuery) => Promise<T>;
}
