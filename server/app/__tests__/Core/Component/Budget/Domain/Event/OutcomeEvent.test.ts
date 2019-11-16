import OutcomeEvent from "../../../../../../src/Core/Component/Budget/Domain/Event/OutcomeEvent";
import AppLogicError from "../../../../../../src/Core/SharedKernel/Error/AppLogicError";

describe("OutcomeEvent", () => {
	it("should throw AppLogicError when provided balanceChange is greater than 0", () => {
		givenPositiveBalanceChange();
		thenOutcomeEventConstructorThrows();
	});
	it("should throw AppLogicError when provided balanceChange is equal to 0", () => {
		givenZeroBalanceChange();
		thenOutcomeEventConstructorThrows();
	});
});

let balanceChange: number;

function givenPositiveBalanceChange() {
	balanceChange = 10;
}

function givenZeroBalanceChange() {
	balanceChange = 0;
}

function thenOutcomeEventConstructorThrows() {
	expect(() => new OutcomeEvent({ balanceChange })).toThrow(AppLogicError);
}
