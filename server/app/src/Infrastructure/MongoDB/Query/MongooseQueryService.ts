import DomainObject from "../../../Core/Port/DomainObject";
import { Document, Query } from "mongoose";
import { List } from "immutable";
import { ReadonlyFilter } from "./MongoDBQueryBuilder";
import QueryObject from "./QueryObject";

export interface MongooseQueryModel<T extends DomainObject, S extends Document> {
	find(): Query<S[]>;
	mapToHydratedDomainObject(document: S): T;
	mapToPartialDomainObject(document: S): Partial<T>;
}

export default abstract class MongooseQueryService<T extends DomainObject, S extends Document> {
	protected abstract model: MongooseQueryModel<T, S>;

	async query(queryObject: QueryObject): Promise<List<T | Partial<T>>> {
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
