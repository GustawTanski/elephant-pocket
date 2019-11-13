import IncomeEvent from "../../../../../../src/Core/Component/Budget/Domain/Event/IncomeEvent";
import AppLogicError from "../../../../../../src/Core/SharedKernel/Error/AppLogicError";

describe("IncomeEvent", () => {
	it("should throw AppLogicError when provided balanceChange is less or equal to 0", () => {
		expect(() => new IncomeEvent({ balanceChange: -10 })).toThrow(AppLogicError);
		expect(() => new IncomeEvent({ balanceChange: 0 })).toThrow(AppLogicError);
	});

	it("should set creationDate as current time when none is provided", () => {
		const incomeEvent = new IncomeEvent({ balanceChange: 10 });
		const now = new Date();
		expect(incomeEvent.creationDate.getTime()).toBe(now.getTime());
	});

	it("should preserve provided creationDate", () => {
		const creationDate = new Date(Date.now() + 10 * 10);
		const incomeEvent = new IncomeEvent({ balanceChange: 100 }, creationDate);
		expect(incomeEvent.creationDate.getTime()).toEqual(creationDate.getTime());
	});
});
