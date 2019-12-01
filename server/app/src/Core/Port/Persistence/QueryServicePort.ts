import DomainObject from "../DomainObject";
import { List } from "immutable";
import QueryObject from "./QueryObjectPort";

export default interface QueryService<T extends DomainObject> {
	query(queryObject: QueryObject): Promise<List<T | Partial<T>>>;
}
