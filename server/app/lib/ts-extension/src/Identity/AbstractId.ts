export default abstract class AbstractId<T> {
	protected _id: T;

	constructor(id: T) {
		this._id = id;
	}

	protected abstract isValid(id: T): boolean;

	abstract toScalar(): string;

	private validate(id: T) {
		if (!this.isValid(id)) throw Error("Invalid id!");
	}
}
