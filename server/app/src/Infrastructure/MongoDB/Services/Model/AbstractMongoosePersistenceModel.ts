import DomainObject from "../../../../Core/Port/DomainObject";
import { Document, Model } from "mongoose";
import AppRuntimeError from "../../../../Core/SharedKernel/Error/AppRuntimeError";

export interface MongoosePersistenceModel<T extends DomainObject, S extends Document> {
	mapToDocument: (domainObject: T) => S;
	mapToDocumentProperties: (domainObject: T) => {};
	findById: (id: T["id"]) => Promise<S | null>;
	delete: (id: T["id"]) => Promise<void>;
}

export default abstract class AbstractMongoosePersistenceModel<T extends DomainObject, S extends Document>
	implements MongoosePersistenceModel<T, S> {
	protected abstract Model: Model<S, {}>;
	
	abstract mapToDocument(domainObject: T): S;
	abstract mapToDocumentProperties(domainObject: T): {};

	async findById(id: T["id"]): Promise<S | null> {
		return await this.Model.findById(id);
	}

	async delete(id: T["id"]): Promise<void> {
		const documentOrNull: S | null = await this.Model.findByIdAndDelete(id);
		if (documentOrNull === null) this.throwNoObjectToDeleteError(id);
	}

	private throwNoObjectToDeleteError(id: T["id"]): never {
		throw new AppRuntimeError(`there is no object with id: ${id.toString()} to delete`);
	}
}
