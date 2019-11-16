import BudgetEventImp, { IBudgetEventPayload, BudgetEventName } from "./BudgetEvent";

export const BUDGET_CREATION: BudgetEventName = "BUDGET_CREATION";

export default class CreationEvent extends BudgetEventImp {
	constructor(creationDate?: Date) {
		const payload: IBudgetEventPayload = {
			balanceChange: 0
		};
		super({ name: BUDGET_CREATION, payload, creationDate });
	}
	protected validatePayload(): void {}
}
