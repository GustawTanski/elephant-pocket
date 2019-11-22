import AppRuntimeError from "../../Core/SharedKernel/Error/AppRuntimeError";
import DomainObject from "../../Core/Port/DomainObject";
import { MongooseModule } from "./MongooseModule";

export default class MongoDBPersistenceService<T extends DomainObject> {
	private mongooseModule: MongooseModule<T>;

	constructor(mongooseModule: MongooseModule<T>) {
		this.mongooseModule = mongooseModule;
	}

	async save(domainObject: T): Promise<void> {
		const { id } = domainObject;
		if (await this.isObjectExisting(id)) await this.overwriteExistingObject(domainObject);
		else await this.createNewObject(domainObject);
	}

	private async isObjectExisting(id: T["id"]): Promise<boolean> {
		return await this.mongooseModule.isExisting(id);
	}

	private async createNewObject(domainObject: T): Promise<void> {
		await this.mongooseModule.create(domainObject);
	}

	private async overwriteExistingObject(domainObject: T): Promise<void> {
		await this.mongooseModule.overwrite(domainObject);
	}

	async delete(id: T["id"]): Promise<void> {
		if (!(await this.isObjectExisting(id))) this.throwNoObjectWithProvidedIdError();
		await this.deleteObject(id);
	}

	private throwNoObjectWithProvidedIdError(): never {
		throw new AppRuntimeError(`there is no ${this.mongooseModule.name} with provided id`);
	}

	private async deleteObject(id: T["id"]): Promise<void> {
		await this.mongooseModule.delete(id);
	}
}
