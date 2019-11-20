import AppRuntimeError from "../../Core/SharedKernel/Error/AppRuntimeError";
import DomainObject from "../../Core/Port/DomainObject";
import { MongooseModule } from "./MongooseModule";

export default class MongoDBPersistenceService<T extends DomainObject> {
	private mongooseModule: MongooseModule<T>;

	constructor(mongooseModule: MongooseModule<T>) {
		this.mongooseModule = mongooseModule;
	}

	async save(domainObject: T): Promise<void> {
		const isObjectExisting: boolean = await this.mongooseModule.isExisting(domainObject.id);
		if (!isObjectExisting) this.mongooseModule.create(domainObject);
		else this.mongooseModule.overwrite(domainObject);
	}

	async delete(id: T["id"]): Promise<void> {
		if (!(await this.mongooseModule.isExisting(id)))
			throw new AppRuntimeError(`there is no ${this.mongooseModule.name} with provided id`);
		this.mongooseModule.delete(id);
	}
}
