import AbstractBudgetEvent from "./AbstractBudgetEvent";
import AppLogicError from "../../../../SharedKernel/Error/AppLogicError";
import { IBudgetEventPayload, BudgetEventName } from "./BudgetEvent";

export const BUDGET_OUTCOME: BudgetEventName = "BUDGET_OUTCOME";

export default class OutcomeEvent extends AbstractBudgetEvent {
	constructor(payload: IBudgetEventPayload, creationDate?: Date) {
		super({ name: BUDGET_OUTCOME, payload, creationDate });
	}

	protected validatePayload(payload: IBudgetEventPayload) {
		if (!this.isLowerThanZero(payload.balanceChange))
			throw new AppLogicError("OutcomeEvent must have negative balance change");
	}

	private isLowerThanZero(value: number) {
		return value < 0;
	}
}
