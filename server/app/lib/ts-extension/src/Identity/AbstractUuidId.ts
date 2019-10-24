import AbstractId from "./AbstractId";
import UuidGenerator from "../Uuid/UuidGenerator";
import Uuid from "../Uuid/Uuid";

export default abstract class AbstractUuidId extends AbstractId<Uuid> {
	constructor(id?: Uuid | string) {
		if (id instanceof Uuid) super(id);
		else if (!(typeof id == "undefined")) super(new Uuid(id));
		else super(UuidGenerator.generate());
	}

	toString(): string {
		return this._id.toString();
	}

	protected isValid() {
		return true;
	}
}
