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
	private filters: List<ReadonlyFilter> = List<ReadonlyFilter>();
	private hydrateOption: boolean = false;

	static create(): MongoDBQueryBuilder {
		return new MongoDBQueryBuilder();
	}

	private constructor() {}

	where(propertyName: string): this {
		this.addFilter({ name: "where", value: propertyName });
		return this;
	}

	gt(value: any): this {
		this.addFilter({ name: "gt", value });
		return this;
	}

	lt(value: any): this {
		this.addFilter({ name: "lt", value });
		return this;
	}
	gte(value: any): this {
		this.addFilter({ name: "gte", value });
		return this;
	}

	lte(value: any): this {
		this.addFilter({ name: "lte", value });
		return this;
	}

	equals(value: any): this {
		this.addFilter({ name: "equals", value });
		return this;
	}

	private addFilter(filter: ReadonlyFilter) {
		this.filters = this.filters.push(filter);
	}

	build(): Readonly<QueryObject> {
		return {
			filters: this.filters,
			hydrate: this.hydrateOption
		};
	}

	hydrate(): this {
		this.hydrateOption = true;
		return this;
	}
}
