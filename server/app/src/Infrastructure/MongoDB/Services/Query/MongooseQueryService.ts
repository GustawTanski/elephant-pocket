import DomainObject from "../../../../Core/Port/DomainObject";
import { Document, Query } from "mongoose";
import { List } from "immutable";
import MongoDBQueryObject from "../../../../Core/Port/Persistence/MongoDB/MongoDBQueryObjectPort";
import { MongooseQueryModel } from "../Model/AbstractMongooseQueryModel";
import QueryService from "../../../../Core/Port/Persistence/QueryServicePort";
import { ReadonlyFilter } from "../../../../Core/Port/Persistence/MongoDB/MongoDBQueryFilterPort";

export default class MongooseQueryService<T extends DomainObject, S extends Document>
	implements QueryService<T> {
	private model: MongooseQueryModel<T, S>;

	constructor(model: MongooseQueryModel<T, S>) {
		this.model = model;
	}

	async query(queryObject: MongoDBQueryObject): Promise<List<T | Partial<T>>> {
		let query = this.model.find();
		query = this.executeFilters(queryObject.filters, query);
		const documents: S[] = await query;
		if (queryObject.hydrate) return this.mapDocumentsToHydratedList(documents);
		else return this.mapDocumentsToPartialList(documents);
	}

	private executeFilters(filters: List<ReadonlyFilter>, query: Query<S[]>): Query<S[]> {
		return filters.reduce(this.chainQuery, query);
	}

	private chainQuery(query: Query<S[]>, filter: ReadonlyFilter): Query<S[]> {
		if (filter.name == "where") return query.where(filter.value);
		else return query[filter.name](filter.value);
	}

	private mapDocumentsToHydratedList(documents: S[]): List<T> {
		const hydratedObjects: T[] = documents.map(this.model.mapToHydratedDomainObject);
		return List(hydratedObjects);
	}

	private mapDocumentsToPartialList(documents: S[]): List<Partial<T>> {
		const partialObjects: Partial<T>[] = documents.map(this.model.mapToPartialDomainObject);
		return List(partialObjects);
	}
}
