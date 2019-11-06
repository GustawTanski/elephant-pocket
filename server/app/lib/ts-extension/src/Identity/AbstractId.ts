import ValueObject from "../ValueObject";

export default abstract class AbstractId<T> implements ValueObject {
	protected _id: T;

	constructor(id: T) {
		this._id = id;
	}

	protected abstract isValid(id: T): boolean;

	abstract equals(comparedObject: this): boolean;

	abstract toString(): string;

	private validate(id: T) {
		if (!this.isValid(id)) throw Error("Invalid id!");
	}
}
