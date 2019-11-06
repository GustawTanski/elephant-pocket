import UserId from "../SharedKernel/Component/User/Domain/User/UserId";

export default interface IObjectWithId {
	id: UserId;
	[key: string]: any;
}
