import DomainObject from "../../Core/Port/DomainObject";
import { Model, Document, Query } from "mongoose";
import { List } from "immutable";
import { QueryObject, Filter } from "./MongoDBQueryBuilder";

export default abstract class MongooseQueryService<T extends DomainObject, S extends Document> {
	protected abstract model: Model<S, {}>;

	async query(queryObject: QueryObject): Promise<List<Partial<T>>> {
		let query = this.model.find();
		query = this.executeFilters(queryObject.filters, query);
		const documents: S[] = await query;
		const domainObjects = this.mapDocumentsToDomainObjectsData(documents);
		return List(domainObjects);
	}

	private executeFilters(filters: List<Filter<any>>, query: Query<S[]>): Query<S[]> {
		return filters.reduce(this.chainQuery, query);
	}

	private chainQuery(query: Query<S[]>, filter: Filter<any>): Query<S[]> {
		if (filter.name == "where") return query.where(filter.value);
		else return query[filter.name](filter.value);
	}

	private mapDocumentsToDomainObjectsData(documents: S[]): Partial<T>[] {
		return documents.map(this.mapToDomainObjectData);
	}

	protected abstract mapToDomainObjectData(document: S): Partial<T>;
}
