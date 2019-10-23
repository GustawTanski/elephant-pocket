import AbstractId from "./AbstractId";
import UuidGenerator from "../Uuid/UuidGenerator";
import Uuid from "../Uuid/Uuid";

export default abstract class AbstractUuidId extends AbstractId<Uuid> {
	constructor(id?: Uuid | string) {
		if (id instanceof Uuid) super(id);
		else if (id) super(new Uuid(id));
		else super(UuidGenerator.generate());
	}

	toScalar(): string {
		return this._id.toString();
	}

	isValid(id: Uuid) {
		return true;
	}
}
