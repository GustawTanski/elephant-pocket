import AbstractBudgetEvent from "./AbstractBudgetEvent";
import IncomeEvent, { BUDGET_INCOME } from "./IncomeEvent";
import OutcomeEvent, { BUDGET_OUTCOME } from "./OutcomeEvent";
import InvalidBudgetEventTypeError from "../../../../SharedKernel/Component/Budget/Domain/Error/InvalidBudgetEventTypeError";
import { BudgetEvent } from "./BudgetEvent";

export default class BudgetEventFactory {
	static produce(base: BudgetEvent): AbstractBudgetEvent {
		switch (base.name) {
			case BUDGET_INCOME:
				return new IncomeEvent(base.payload, base.creationDate);
			case BUDGET_OUTCOME:
				return new OutcomeEvent(base.payload, base.creationDate);
			default:
				throw new InvalidBudgetEventTypeError(`there is no event with name: "${base.name}"`);
		}
	}
}
