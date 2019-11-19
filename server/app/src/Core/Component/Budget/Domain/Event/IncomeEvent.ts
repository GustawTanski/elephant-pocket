import AbstractBudgetEvent from "./AbstractBudgetEvent";
import AppLogicError from "../../../../SharedKernel/Error/AppLogicError";
import { BudgetEventName, IBudgetEventPayload } from "./BudgetEvent";

export const BUDGET_INCOME: BudgetEventName = "BUDGET_INCOME";

export default class IncomeEvent extends AbstractBudgetEvent {
	constructor(payload: IBudgetEventPayload, creationDate?: Date) {
		super({ name: BUDGET_INCOME, payload, creationDate });
	}

	protected validatePayload(payload: IBudgetEventPayload) {
		if (!this.isGreaterThanZero(payload.balanceChange))
			throw new AppLogicError("IncomeEvent must have positive balance change");
	}

	private isGreaterThanZero(value: number) {
		return value > 0;
	}
}
