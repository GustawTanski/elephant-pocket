import Budget, { BudgetInput } from "../../../../../../src/Core/Component/Budget/Domain/Budget/Budget";
import BudgetEventImp from "../../../../../../src/Core/Component/Budget/Domain/Event/BudgetEvent";
import UserId from "../../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId";
import BudgetId from "../../../../../../src/Core/SharedKernel/Component/Budget/Domain/Budget/BudgetId";
import CreationEvent from "../../../../../../src/Core/Component/Budget/Domain/Event/CreationEvent";
import DateRange from "../../../../../../src/Core/Component/Budget/Domain/DateRange/DateRange";
import UuidGenerator from "../../../../../../lib/ts-extension/src/Uuid/UuidGenerator";
import IncomeEvent from "../../../../../../src/Core/Component/Budget/Domain/Event/IncomeEvent";
import InvalidArgumentError from "../../../../../../src/Core/SharedKernel/Error/InvalidArgumentError";

class TestBudget extends Budget {
    type = "TEST"
}

let budgetInput: BudgetInput;
let history: BudgetEventImp[];
let minimalBalance: number;
let ownerId: UserId;
let dateRange: DateRange;
let id: BudgetId;
let budget: Budget;


describe('Budget', () => {
    function givenValidBudgetInput() {
        history = [new CreationEvent()];
        minimalBalance = 0;
        ownerId = new UserId();
        dateRange = DateRange.createFromInterval(new Date(), 10**4);
        id = new BudgetId();
        budgetInput = {
            history,
            ownerId,
            minimalBalance,
            dateRange,
            id
        }
    }


    it("constructor should create new valid BudgetId if none is provided", () => {
        givenBudgetInputWithoutId();
        whenConstructingBudget();
        thenBudgetHasNewValidId();
    })

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

    it("constructor should create new history with CreationEvent as 0 element when none is provided", () => {
        givenBudgetInputWithoutHistory();
        whenConstructingBudget();
        thenBudgetHasHistoryWithCreationEventAtStart();
    })

    function givenBudgetInputWithoutHistory() {
        givenValidBudgetInput();
        delete budgetInput.history;
    }

    function thenBudgetHasHistoryWithCreationEventAtStart() {
        expect(budget.history.length).not.toBe(0);
        expect(budget.history[0]).toBeInstanceOf(CreationEvent);
    }

    it("constructor should throw InvalidArgumentError when provided history 0 element is not a CreationEvent", () => {
        givenBudgetInputWithInvalidFirstEventInHistory();
        thenConstructorThrows(InvalidArgumentError);
    })

    function givenBudgetInputWithInvalidFirstEventInHistory() {
        givenValidBudgetInput();
        budgetInput.history = [ new IncomeEvent({ balanceChange: 1})];
    }

    function thenConstructorThrows(error: any) {
        expect(() => new TestBudget(budgetInput)).toThrow(error);
    }

    it("constructor should throw InvalidArgumentError when provided history is empty", () => {
        givenBudgetInputWithEmptyHistory();
        thenConstructorThrows(InvalidArgumentError);
    })

    function givenBudgetInputWithEmptyHistory() {
        givenValidBudgetInput();
        budgetInput.history = new Array<BudgetEventImp>();
    }

    it("constructor should copy provided history", () => {
        givenValidBudgetInput();
        whenConstructingBudget();
        thenBudgetHasCopiedHistory();
    })

    function thenBudgetHasCopiedHistory() {
        expect(budget["_history"]).not.toBe(history);
        expect(budget["_history"]).toEqual(history);
    }

})
