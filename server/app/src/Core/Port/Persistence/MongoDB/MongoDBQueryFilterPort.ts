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
