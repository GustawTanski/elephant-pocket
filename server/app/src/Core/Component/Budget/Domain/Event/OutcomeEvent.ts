import BudgetEvent, { IBudgetEventPayload, BudgetEventName } from "./BudgetEvent";
import AppLogicError from "../../../../SharedKernel/Error/AppLogicError";

export const BUDGET_OUTCOME: BudgetEventName = "BUDGET_OUTCOME";

export default class OutcomeEvent extends BudgetEvent {
	constructor(payload: IBudgetEventPayload, creationDate: Date) {
		super({ name: BUDGET_OUTCOME, payload, creationDate });
	}

	protected validatePayload(payload: IBudgetEventPayload) {
		if (payload.balanceChange >= 0)
			throw new AppLogicError("OutcomeEvent must have negative balance change");
	}
}
