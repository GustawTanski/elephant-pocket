import { BudgetEventName, IBudgetEventPayload, BudgetEvent } from "./BudgetEvent";

interface IBudgetEventInput {
	name: BudgetEventName;
	payload: IBudgetEventPayload;
	creationDate?: Date;
}
export default abstract class AbstractBudgetEvent implements BudgetEvent{
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
