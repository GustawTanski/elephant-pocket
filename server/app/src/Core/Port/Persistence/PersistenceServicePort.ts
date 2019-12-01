import DomainObject from "../DomainObject";

export default interface PersistenceService<T extends DomainObject> {
	save(domainObject: T): Promise<void>;
	delete(id: T["id"]): Promise<void>;
}
