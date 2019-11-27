import { List } from "immutable";
import QueryObject from "./QueryObject";

export interface GenericFilter<T> {
	name: "gt" | "equals" | "gte" | "lt" | "lte";
	value: T;
}

export interface StringFilter {
	name: "where";
	value: string;
}

export type Filter<T> = StringFilter | GenericFilter<T>;
export type ReadonlyFilter = Readonly<Filter<any>>;

export default class MongoDBQueryBuilder {
	private collectionName: string;
	private filters: List<ReadonlyFilter> = List<ReadonlyFilter>();

	static create(collectionName: string): MongoDBQueryBuilder {
		return new MongoDBQueryBuilder(collectionName);
	}

	private constructor(collectionName: string) {
		this.collectionName = collectionName;
	}

	where(propertyName: string): this {
		this.addFilter({ name: "where", value: propertyName });
		return this;
	}

	gt<T>(value: T): this {
		this.addFilter({ name: "gt", value });
		return this;
	}

	lt<T>(value: T): this {
		this.addFilter({ name: "lt", value });
		return this;
	}
	gte<T>(value: T): this {
		this.addFilter({ name: "gte", value });
		return this;
	}

	lte<T>(value: T): this {
		this.addFilter({ name: "lte", value });
		return this;
	}

	equals<T>(value: T): this {
		this.addFilter({ name: "equals", value });
		return this;
	}

	private addFilter(filter: ReadonlyFilter) {
		this.filters = this.filters.push(filter);
	}

	build(): Readonly<QueryObject> {
		return {
			filters: this.filters,
			collectionName: this.collectionName
		};
	}
}
