export default abstract class CustomError extends Error {
	constructor(message?: string) {
		super(message);
		Object.defineProperty(this, "name", {
			enumerable: false,
			value: new.target.name
		});
		Object.setPrototypeOf(this, new.target.prototype);
		Error.captureStackTrace(this, this.constructor);
	}
}
