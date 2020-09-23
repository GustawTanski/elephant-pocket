import { List } from "immutable";
import { ReadonlyFilter } from "./MongoDBQueryFilterPort";
import QueryObject from "../QueryObjectPort";

export default interface MongoDBQueryObject extends QueryObject {
	filters: List<ReadonlyFilter>;
	hydrate: boolean;
}