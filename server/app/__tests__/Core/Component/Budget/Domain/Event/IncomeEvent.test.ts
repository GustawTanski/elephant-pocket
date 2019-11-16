import IncomeEvent from "../../../../../../src/Core/Component/Budget/Domain/Event/IncomeEvent";
import AppLogicError from "../../../../../../src/Core/SharedKernel/Error/AppLogicError";

let balanceChange: number;
let incomeEvent: IncomeEvent;
let creationDate: Date;

describe("IncomeEvent", () => {
	it("should throw AppLogicError when provided balanceChange is less than 0", () => {
		givenNegativeBalanceChange();
		thenIncomeEventConstructorThrows();
	});

	it("should throw AppLogicError when provided balanceChange is equal to 0", () => {
		givenZeroBalanceChange();
		thenIncomeEventConstructorThrows();
	});

	function givenNegativeBalanceChange() {
		balanceChange = -10;
	}
	function givenZeroBalanceChange() {
		balanceChange = 0;
	}
	function thenIncomeEventConstructorThrows() {
		expect(() => new IncomeEvent({ balanceChange })).toThrow(AppLogicError);
	}
	it("should set creationDate as current time when none is provided", () => {
		givenPositiveBalanceChange();
		whenConstructingWithoutCreationDate();
		thenCreationDateIsNow();
	});

	function givenPositiveBalanceChange() {
		balanceChange = 10;
	}
	function whenConstructingWithoutCreationDate() {
		incomeEvent = new IncomeEvent({ balanceChange });
		creationDate = new Date();
	}
	function thenCreationDateIsNow() {
		expect(incomeEvent.creationDate.getTime()).toBe(creationDate.getTime());
	}
	it("should copy provided creationDate", () => {
		givenPositiveBalanceChangeAndDate();
		whenConstructingWithCreationDate();
		thenCreationDateIsCopied();
	});

	function givenPositiveBalanceChangeAndDate() {
		givenPositiveBalanceChange();
		creationDate = new Date(Date.now() - 10 ** 10);
	}
	function whenConstructingWithCreationDate() {
		incomeEvent = new IncomeEvent({ balanceChange }, creationDate);
	}
	function thenCreationDateIsCopied() {
		expect(incomeEvent.creationDate.getTime()).toBe(creationDate.getTime());
		expect(incomeEvent.creationDate).not.toBe(creationDate);
	}
});
