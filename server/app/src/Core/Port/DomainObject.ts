import AbstractUuidId from "../../../lib/ts-extension/src/Identity/AbstractUuidId";

export default interface DomainObject {
	id: AbstractUuidId;
	[key: string]: any;
}
