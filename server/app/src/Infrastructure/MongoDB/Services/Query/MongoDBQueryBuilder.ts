import { List } from "immutable";
import MongoDBQueryObject from "../../../../Core/Port/Persistence/MongoDB/MongoDBQueryObjectPort";
import { ReadonlyFilter } from "../../../../Core/Port/Persistence/MongoDB/MongoDBQueryFilterPort";
import { MongoDBQueryBuilder } from "../../../../Core/Port/Persistence/MongoDB/MongoDBQueryBuilderPort";

export default class MongoDBQueryBuilderImp implements MongoDBQueryBuilder {
	private filters: List<ReadonlyFilter> = List<ReadonlyFilter>();
	private hydrateOption: boolean = false;

	static create(): MongoDBQueryBuilderImp {
		return new MongoDBQueryBuilderImp();
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

	build(): Readonly<MongoDBQueryObject> {
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
