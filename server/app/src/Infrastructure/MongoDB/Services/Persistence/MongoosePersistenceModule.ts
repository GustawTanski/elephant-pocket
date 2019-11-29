import { Document } from "mongoose";

import DomainObject from "../../../../Core/Port/DomainObject";
import AppRuntimeError from "../../../../Core/SharedKernel/Error/AppRuntimeError";
import { MongoosePersistenceModel } from "../Model/AbstractMongoosePersistenceModel";

export interface MongoosePersistenceModule<T extends DomainObject> {
	create: (domainObject: T) => Promise<void>;
	overwrite: (domainObject: T) => Promise<void>;
	isExisting: (id: T["id"]) => Promise<boolean>;
	delete: (id: T["id"]) => Promise<void>;
	readonly name: string;
}

export default class MongoosePersistenceModuleImp<T extends DomainObject, S extends Document>
	implements MongoosePersistenceModule<T> {
	readonly name: string;
	private model: MongoosePersistenceModel<T, S>;

	constructor(model: MongoosePersistenceModel<T, S>, name: string) {
		this.model = model;
		this.name = name;
	}

	async create(domainObject: T): Promise<void> {
		const document: S = this.model.mapToDocument(domainObject);
		await document.save();
	}

	async overwrite(domainObject: T): Promise<void> {
		const { id } = domainObject;
		const document: S | null = await this.model.findById(id);
		if (document) await this.overwriteDocumentWithDomainObject(document, domainObject);
		else this.throwNoObjectToOverwriteError(id);
	}

	private throwNoObjectToOverwriteError(id: T["id"]): never {
		throw new AppRuntimeError(`there is no object with id: ${id.toString()} to overwrite`);
	}

	private async overwriteDocumentWithDomainObject(document: S, domainObject: T) {
		const properties: {} = this.model.mapToDocumentProperties(domainObject);
		document.overwrite(properties);
		await document.save();
	}

	async isExisting(id: T["id"]): Promise<boolean> {
		const document: S | null = await this.model.findById(id);
		return !!document;
	}

	async delete(id: T["id"]): Promise<void> {
		await this.model.delete(id);
	}
}
