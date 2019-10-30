import validate from "uuid-validate";
import ValueObject from "../ValueObject";

export default class Uuid implements ValueObject {
	private uuid: string;
	constructor(uuid: string) {
		if (!this.validate(uuid)) throw new Error("Wrong uuid string provided!");
		this.uuid = uuid;
	}

	equals(comparedObject: Uuid): boolean {
		return this.uuid == comparedObject.uuid;
	}

	toString(): string {
		return this.uuid;
	}

	toJSON(): string {
		return this.uuid;
	}

	private validate(uuid: string) {
		return validate(uuid);
	}
}
