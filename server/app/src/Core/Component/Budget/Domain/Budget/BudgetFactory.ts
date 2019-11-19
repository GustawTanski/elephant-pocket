import InvalidBudgetTypeError from "../../../../SharedKernel/Component/Budget/Domain/Error/InvalidBudgetTypeError";
import DailyLimitBudget, { DAILY_LIMIT } from "./DailyLimitBudget";
import Budget, { BudgetInput } from "./Budget";

export interface BudgetFactoryInput extends BudgetInput {
	type: string;
}

export default class BudgetFactory {
	static produce(base: BudgetFactoryInput): Budget {
		switch (base.type) {
			case DAILY_LIMIT:
				return new DailyLimitBudget(base);
			default:
				throw new InvalidBudgetTypeError(`there is no budget with type: "${base.type}"`);
		}
	}
}
