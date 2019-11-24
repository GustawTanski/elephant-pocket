import DomainObject from "../../Core/Port/DomainObject";
import { Model, Document } from "mongoose";

export interface QueryObject {
	filters: Array<Filter>;
}

export interface Filter {
	name: "where" | "gt";
	value: string;
}

export default abstract class MongooseQueryService<T extends DomainObject, S extends Document> {
	protected abstract model: Model<S, {}>;

	async query(queryObject: QueryObject) {
		let mongooseQuery = this.model.find();
		mongooseQuery = queryObject.filters.reduce((query, filter) => {
			return query[filter.name](filter.value);
		}, mongooseQuery);
	}
}
