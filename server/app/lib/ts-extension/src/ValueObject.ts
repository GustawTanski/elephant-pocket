export default interface ValueObject {
	equals: (comparedObject: this) => boolean;
}
