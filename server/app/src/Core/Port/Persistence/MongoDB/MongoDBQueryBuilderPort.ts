import MongoDBQueryObject from "./MongoDBQueryObjectPort";

export interface MongoDBQueryBuilderStatic {
	create(): MongoDBQueryBuilder;
}

export interface MongoDBQueryBuilder {
	where(propertyName: string): this;
	gt(value: any): this;
	lt(value: any): this;
	gte(value: any): this;
	lte(value: any): this;
	equals(value: any): this;
	build(): Readonly<MongoDBQueryObject>;
	hydrate(): this;
}
