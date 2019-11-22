import { Document } from "mongoose";

import DomainObject from "../../Core/Port/DomainObject";
import AppRuntimeError from "../../Core/SharedKernel/Error/AppRuntimeError";
import { MongooseModel } from "./Model/AbstractMongooseModel";

export interface MongooseModule<T extends DomainObject> {
	create: (domainObject: T) => Promise<void>;
	overwrite: (domainObject: T) => Promise<void>;
	isExisting: (id: T["id"]) => Promise<boolean>;
	delete: (id: T["id"]) => Promise<void>;
	readonly name: string;
}

export default class MongooseModuleImp<T extends DomainObject, S extends Document>
	implements MongooseModule<T> {
	readonly name: string;
	private model: MongooseModel<T, S>;

	constructor(model: MongooseModel<T, S>, name: string) {
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

	throwNoObjectToOverwriteError(id: T["id"]): never {
		throw new AppRuntimeError(`there is no object with id: ${id} to overwrite`);
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
