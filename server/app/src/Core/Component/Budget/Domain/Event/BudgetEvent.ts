export interface IBudgetEventPayload {
	balanceChange: number;
}

interface IBudgetEventInput {
	name: BudgetEventName;
	payload: IBudgetEventPayload;
	creationDate?: Date;
}

export type BudgetEventName = string;

export interface BudgetEvent {
	name: BudgetEventName;
	payload: IBudgetEventPayload;
	creationDate: Date;
}

export default abstract class BudgetEventImp implements BudgetEvent {
	name: BudgetEventName;
	payload: IBudgetEventPayload;
	creationDate: Date;

	constructor({ payload, name, creationDate }: IBudgetEventInput) {
		this.validatePayload(payload);
		this.name = name;
		this.payload = { ...payload };
		creationDate = creationDate || new Date();
		this.creationDate = new Date(creationDate);
	}

	protected abstract validatePayload(payload: IBudgetEventPayload): void;
}
