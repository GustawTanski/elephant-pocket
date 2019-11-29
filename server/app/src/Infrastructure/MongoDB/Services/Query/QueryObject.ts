import { List } from "immutable";
import { ReadonlyFilter } from "./MongoDBQueryBuilder";

export default interface QueryObject {
	filters: List<ReadonlyFilter>;
	hydrate: boolean;
}