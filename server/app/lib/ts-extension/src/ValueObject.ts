export default interface IValueObject {
	equals: (comparedObject: this) => boolean;
}
