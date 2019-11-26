import DomainObject from "../../Core/Port/DomainObject";
import { Model, Document, Query } from "mongoose";
import { List } from "immutable";

export interface QueryObject {
	filters: List<Filter<any>>;
}

export interface GenericFilter<T> {
	name: "gt" | "equals" | "gte" | "lt" | "lte";
	value: T;
}

export interface StringFilter {
	name: "where";
	value: string;
}

export type Filter<T> = StringFilter | GenericFilter<T>;

export default abstract class MongooseQueryService<T extends DomainObject, S extends Document> {
	protected abstract model: Model<S, {}>;

	async query(queryObject: QueryObject): Promise<List<DomainObject>> {
		let query = this.model.find();
		query = this.executeFilters(queryObject.filters, query);
		const documents: S[] = await query;
		const domainObjects = this.mapDocumentsToDomainObjects(documents);
		return List(domainObjects);
	}

	private executeFilters(filters: List<Filter<any>>, query: Query<S[]>): Query<S[]> {
		return filters.reduce(this.chainQuery, query);
	}

	private chainQuery(query: Query<S[]>, filter: Filter<any>): Query<S[]> {
		if (filter.name == "where") return query.where(filter.value);
		else return query[filter.name](filter.value);
	}

	private mapDocumentsToDomainObjects(documents: S[]): T[] {
		return documents.map(this.mapToDomainObject);
	}

	protected abstract mapToDomainObject(document: S): T;
}
