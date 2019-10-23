import validate from "uuid-validate";

export default class Uuid {
	private uuid: string;
	constructor(uuid: string) {
		if (!this.validate(uuid)) throw new Error("Wrong uuid string provided!");
		this.uuid = uuid;
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
