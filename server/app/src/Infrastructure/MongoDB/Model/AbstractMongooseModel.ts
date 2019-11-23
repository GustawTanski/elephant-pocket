import DomainObject from "../../../Core/Port/DomainObject";
import { Document, Model } from "mongoose";
import AppRuntimeError from "../../../Core/SharedKernel/Error/AppRuntimeError";

export interface MongooseModel<T extends DomainObject, S extends Document> {
	mapToDocument: (domainObject: T) => S;
	mapToDocumentProperties: (domainObject: T) => {};
	findById: (id: T["id"]) => Promise<S | null>;
	delete: (id: T["id"]) => Promise<void>;
}

export default abstract class AbstractMongooseModel<T extends DomainObject, S extends Document>
	implements MongooseModel<T, S> {
	private model: Model<S, {}>;

	constructor(model: Model<S, {}>) {
		this.model = model;
	}

	abstract mapToDocument(domainObject: T): S;

	abstract mapToDocumentProperties(domainObject: T): {};

	async findById(id: T["id"]): Promise<S | null> {
		return await this.model.findById(id);
	}

	async delete(id: T["id"]): Promise<void> {
		const documentOrNull: S | null = await this.model.findByIdAndDelete(id);
		if (documentOrNull === null) this.throwNoObjectToDeleteError(id);
	}

	private throwNoObjectToDeleteError(id: T["id"]): never {
		throw new AppRuntimeError(`there is no object with id: ${id.toString()} to delete`);
	}
}
