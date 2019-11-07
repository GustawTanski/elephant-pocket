import Budget from "../../../../../../src/Core/Component/Budget/Domain/Budget/Budget";
import IncomeEvent from "../../../../../../src/Core/Component/Budget/Domain/Event/IncomeEvent";
import BudgetEvent from "../../../../../../src/Core/Component/Budget/Domain/Event/BudgetEvent";
import OutcomeEvent from "../../../../../../src/Core/Component/Budget/Domain/Event/OutcomeEvent";
import DateRange from "../../../../../../src/Core/Component/Budget/Domain/DateRange/DateRange";

class TestBudget extends Budget {}

const currentDateRange = new DateRange(Date.now() - 10 ** 7, Date.now() + 10 ** 7);

describe("Budget", () => {
	describe("constructor", () => {
		it("should throw InvalidArgumentError when provided history doesn't start with CreationEvent", () => {
            
        });
	});

	it("should evaluate correct balance", () => {
		const transactions: number[] = [1000, -50, -32.55, -255, 100, -22];
		const transactionEvents: BudgetEvent[] = transactions.map(transaction => {
			let Event;
			if (transaction > 0) Event = IncomeEvent;
			else Event = OutcomeEvent;
			return new Event({ balanceChange: transaction }, new Date());
		});
		const budget = new TestBudget({
			dataRange: currentDateRange,
			minimalBalance: 0
		});
		transactionEvents.forEach(event => budget.pushEvent(event));
		const transactionsSum = transactions.reduce<number>((prev, curr) => {
			return prev + curr;
		}, 0);
		expect(budget.getBalance()).toBe(transactionsSum);
	});
});
