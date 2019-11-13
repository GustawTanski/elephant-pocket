import BudgetEvent, { IBudgetEventPayload, BudgetEventName } from "./BudgetEvent";

const BUDGET_CREATION: BudgetEventName = "BUDGET_CREATION";

export default class CreationEvent extends BudgetEvent {
	constructor(creationDate?: Date) {
		const payload: IBudgetEventPayload = {
			balanceChange: 0
		};
		super({ name: BUDGET_CREATION, payload, creationDate });
	}
	protected validatePayload(): void {}
}
