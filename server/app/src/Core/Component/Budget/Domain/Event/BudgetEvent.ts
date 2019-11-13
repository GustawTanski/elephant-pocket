export interface IBudgetEventPayload {
	balanceChange: number;
}

interface IBudgetEventInput {
	name: BudgetEventName;
	payload: IBudgetEventPayload;
	creationDate?: Date;
}

export type BudgetEventName = string;

export default abstract class BudgetEvent {
	protected _name: string;
	protected _payload: IBudgetEventPayload;
	protected _creationDate: Date;
	get name() {
		return this._name;
	}
	get payload() {
		return {...this._payload};
	}
	get creationDate() {
		return new Date(this._creationDate);
	}
	constructor({ payload, name, creationDate }: IBudgetEventInput) {
		this.validatePayload(payload);
		this._name = name;
		this._payload = payload;
		this._creationDate = creationDate || new Date();
	}

	protected abstract validatePayload(payload: IBudgetEventPayload): void;
}
