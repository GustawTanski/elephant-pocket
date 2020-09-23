import Budget, {
	BudgetInput
} from "../../../../../../src/Core/Component/Budget/Domain/Budget/Budget";
import AbstractBudgetEvent from "../../../../../../src/Core/Component/Budget/Domain/Event/AbstractBudgetEvent";
import UserId from "../../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId";
import BudgetId from "../../../../../../src/Core/SharedKernel/Component/Budget/Domain/Budget/BudgetId";
import DateRange from "../../../../../../lib/ts-extension/src/DateRange/DateRange";
import UuidGenerator from "../../../../../../lib/ts-extension/src/Uuid/UuidGenerator";
import IncomeEvent from "../../../../../../src/Core/Component/Budget/Domain/Event/IncomeEvent";
import { BudgetEvent } from "../../../../../../src/Core/Component/Budget/Domain/Event/BudgetEvent";

class TestBudget extends Budget {
	type = "TEST";
}

let budgetInput: BudgetInput;
let history: AbstractBudgetEvent[];
let minimalBalance: number;
let ownerId: UserId;
let dateRange: DateRange;
let id: BudgetId;
let budget: Budget;
let event: BudgetEvent;

describe("Budget", () => {
	function givenValidBudgetInput() {
		history = [new IncomeEvent({ balanceChange: 100 })];
		minimalBalance = 0;
		ownerId = new UserId();
		dateRange = DateRange.createFromInterval(new Date(), 10 ** 4);
		id = new BudgetId();
		budgetInput = {
			history,
			ownerId,
			minimalBalance,
			dateRange,
			id
		};
	}

	it("constructor should create new valid BudgetId if none is provided", () => {
		givenBudgetInputWithoutId();
		whenConstructingBudget();
		thenBudgetHasNewValidId();
	});

	function givenBudgetInputWithoutId() {
		givenValidBudgetInput();
		delete budgetInput.id;
	}

	function whenConstructingBudget() {
		budget = new TestBudget(budgetInput);
	}

	function thenBudgetHasNewValidId() {
		expect(UuidGenerator.validate(budget.id.toString())).toBe(true);
	}

	it("constructor should create new empty history is provided", () => {
		givenBudgetInputWithoutHistory();
		whenConstructingBudget();
		thenBudgetHasEmptyHistory();
	});

	function givenBudgetInputWithoutHistory() {
		givenValidBudgetInput();
		delete budgetInput.history;
	}

	function thenBudgetHasEmptyHistory() {
		expect(budget.history.length).toBe(0);
	}

	it("constructor should copy provided history", () => {
		givenValidBudgetInput();
		whenConstructingBudget();
		thenBudgetHasCopiedHistory();
	});

	function thenBudgetHasCopiedHistory() {
		expect(budget["_history"]).not.toBe(history);
		expect(budget["_history"]).toEqual(history);
	}

	it("#pushEvent should add instance of BudgetEvent at the end of history", () => {
		givenBudgetAndIncomeEvent();
		whenPushingTheseEvent();
		thenThisEventIsAtTheEndOfHistory();
	});

	function givenBudget() {
		givenValidBudgetInput();
		budget = new TestBudget(budgetInput);
	}

	function givenBudgetAndIncomeEvent() {
		givenBudget();
		event = new IncomeEvent({ balanceChange: 1 });
	}

	function whenPushingTheseEvent() {
		budget.pushEvent(event);
	}

	function thenThisEventIsAtTheEndOfHistory() {
		const { length } = budget.history;
		const lastEvent: BudgetEvent = budget.history[length - 1];
		expect(lastEvent).toBe(event);
	}
});
