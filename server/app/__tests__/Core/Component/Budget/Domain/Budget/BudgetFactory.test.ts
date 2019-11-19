import DailyLimitBudget, {
	DAILY_LIMIT
} from "../../../../../../src/Core/Component/Budget/Domain/Budget/DailyLimitBudget";
import Budget, {
	BudgetInput
} from "../../../../../../src/Core/Component/Budget/Domain/Budget/Budget";
import UserId from "../../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId";
import DateRange from "../../../../../../lib/ts-extension/src/DateRange/DateRange";
import BudgetFactory, {
	BudgetFactoryInput
} from "../../../../../../src/Core/Component/Budget/Domain/Budget/BudgetFactory";
import BudgetId from "../../../../../../src/Core/SharedKernel/Component/Budget/Domain/Budget/BudgetId";
import { BudgetEvent } from "../../../../../../src/Core/Component/Budget/Domain/Event/BudgetEvent";
import InvalidBudgetTypeError from "../../../../../../src/Core/SharedKernel/Component/Budget/Domain/Error/InvalidBudgetTypeError";

let type: string;
let budget: Budget;
let producedBudget: Budget;
let budgetInput: BudgetInput;
let factoryInput: BudgetFactoryInput;

describe("BudgetFactory", () => {
	it(".produce should create when instance of DailyLimitBudget when one is an argument", () => {
		givenDailyLimitBudget();
		whenProducing();
		thenProducedBudgetIsCopyOfProvided();
	});

	function givenBudgetInput() {
		let ownerId = new UserId();
		let dateRange = DateRange.createFromInterval(new Date(), 10 ** 5);
		let minimalBalance = 0;
		let id = new BudgetId();
		let history = new Array<BudgetEvent>();
		budgetInput = { ownerId, dateRange, minimalBalance, id, history };
	}

	function givenDailyLimitBudget() {
		givenBudgetInput();
		budget = new DailyLimitBudget(budgetInput);
		factoryInput = budget;
	}

	function whenProducing() {
		producedBudget = BudgetFactory.produce(factoryInput);
	}

	function thenProducedBudgetIsCopyOfProvided() {
		expect(producedBudget).not.toBe(budget);
		expect(producedBudget).toEqual(budget);
		expect(producedBudget).toBeInstanceOf(budget.constructor);
	}

	it(".produce should create instance of DailyLimitBudget when it's type is provided", () => {
		givenBudgetInputAndDailyLimitType();
		whenProducing();
		thenProducedBudgetIsMatchingAndInstanceOf(DailyLimitBudget);
	});

	function givenBudgetInputAndDailyLimitType() {
		givenBudgetInput();
		type = DAILY_LIMIT;
		factoryInput = { ...budgetInput, type };
	}

	function thenProducedBudgetIsMatchingAndInstanceOf(Class: typeof Budget) {
		expect(producedBudget).toBeInstanceOf(Class);
		expect(producedBudget["type"]).toBe(type);
		expect(producedBudget).toEqual(new DailyLimitBudget(budgetInput));
	}

	it(".produce should throw InvalidBudgetTypeError when unknowns type is provided", () => {
		givenBudgetInputAndUnknownType();
		thenProduceShouldThrow(InvalidBudgetTypeError);
	});

	function givenBudgetInputAndUnknownType() {
		givenBudgetInput();
		type = "not real type";
		factoryInput = { ...budgetInput, type };
	}

	function thenProduceShouldThrow(error: any) {
		expect(() => BudgetFactory.produce(factoryInput)).toThrow(error);
	}
});
