import { List, Record } from "immutable";

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

export default class MongoDBQueryBuilder {
	private collectionName: string;
	private filters: List<Record<Filter<any>>> = List<Record<Filter<any>>>();

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

	private addFilter(filter: Filter<any>) {
		this.filters = this.filters.push(filterFactory(filter));
	}
}

export const filterFactory = Record<Filter<any>>({ name: "where", value: "" });
