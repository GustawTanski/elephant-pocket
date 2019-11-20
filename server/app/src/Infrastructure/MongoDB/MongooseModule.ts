import DomainObject from "../../Core/Port/DomainObject";
import { Document } from "mongoose";

export interface MongooseModule<T extends DomainObject> {
	create: (domainObject: T) => Promise<void>;
	overwrite: (domainObject: T) => Promise<void>;
	isExisting: (id: T["id"]) => Promise<boolean>;
	delete: (id: T["id"]) => Promise<void>;
	readonly name: string;
}

export interface Mapper<T extends DomainObject, S extends Document> {
	toDocument: (domainObject: T) => S;
	toDocumentProperties: (domainObject: T) => {};
	findById: (id: T["id"]) => Promise<S>;
}

export default abstract class AbstractMongooseModule<T extends DomainObject, S extends Document>
	implements MongooseModule<T> {
	abstract readonly name: string;
	private mapper: Mapper<T, S>;

	constructor(mapper: Mapper<T, S>) {
		this.mapper = mapper;
	}

	async create(domainObject: T): Promise<void> {
		const document: S = this.mapper.toDocument(domainObject);
		await document.save();
	}

	async overwrite(domainObject: T): Promise<void> {
		const document: S = await this.mapper.findById(domainObject.id);
		const properties: {} = this.mapper.toDocumentProperties(domainObject);
		document.overwrite(properties);
		await document.save();
	}

	async isExisting(id: T["id"]): Promise<boolean> {
		this.mapper.findById(id);
		return (undefined as unknown) as boolean;
	}

	async delete(id: T["id"]): Promise<void> {}
}
