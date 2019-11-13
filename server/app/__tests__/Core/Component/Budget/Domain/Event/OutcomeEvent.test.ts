import OutcomeEvent from "../../../../../../src/Core/Component/Budget/Domain/Event/OutcomeEvent";
import AppLogicError from "../../../../../../src/Core/SharedKernel/Error/AppLogicError";

describe("OutcomeEvent", () => {
	it("should throw AppLogicError when provided balanceChange is greater or equal to 0", () => {
		expect(() => new OutcomeEvent({ balanceChange: 10 })).toThrow(AppLogicError);
		expect(() => new OutcomeEvent({ balanceChange: 0 })).toThrow(AppLogicError);
	});
});
