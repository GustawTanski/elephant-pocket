import BudgetEventImp, { IBudgetEventPayload, BudgetEventName } from "./BudgetEvent";
import AppLogicError from "../../../../SharedKernel/Error/AppLogicError";

export const BUDGET_OUTCOME: BudgetEventName = "BUDGET_OUTCOME";

export default class OutcomeEvent extends BudgetEventImp {
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
