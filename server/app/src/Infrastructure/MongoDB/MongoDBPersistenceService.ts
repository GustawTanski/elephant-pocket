import AbstractUuidId from "../../../lib/ts-extension/src/Identity/AbstractUuidId";
import { Document } from "mongoose";
import AppRuntimeError from "../../Core/SharedKernel/Error/AppRuntimeError";

export interface DomainObject {
	id: AbstractUuidId;
	[propName: string]: any;
}

export interface MongooseModule<T extends DomainObject> {
	create: (domainObject: T) => void;
	overwrite: (domainObject: T) => void;
	isExisting: (id: T["id"]) => boolean;
	readonly name: string;
}

export default class MongoDBPersistenceService<T extends DomainObject> {
	private mongooseModule: MongooseModule<T>;

	constructor(mongooseModule: MongooseModule<T>) {
		this.mongooseModule = mongooseModule;
	}

	save(domainObject: T) {
		const isObjectExisting = this.mongooseModule.isExisting(domainObject.id);
		if (!isObjectExisting) this.mongooseModule.create(domainObject);
		else this.mongooseModule.overwrite(domainObject);
	}

	delete(id: T["id"]) {
		if (!this.mongooseModule.isExisting(id))
			throw new AppRuntimeError(`there is no ${this.mongooseModule.name} with provided id`);
	}
}
