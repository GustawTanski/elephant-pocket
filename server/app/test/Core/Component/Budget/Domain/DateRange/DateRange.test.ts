import DateRange from "../../../../../../src/Core/Component/Budget/Domain/DateRange/DateRange";
import InvalidArgumentError from "../../../../../../src/Core/SharedKernel/Error/InvalidArgumentError";

describe("DateRange", () => {
	describe("#constructor", () => {
		it("should copy provided Date object", () => {
			expect.assertions(4);
			const begin = new Date();
			const end = new Date(Date.now() + 10000);
			const dateRange = new DateRange({ begin, end });
			begin.setHours(0);
			end.setMinutes(0);
			expect(dateRange.begin).not.toBe(begin);
			expect(dateRange.begin.getTime()).not.toBe(begin.getTime());
			expect(dateRange.end).not.toBe(end);
			expect(dateRange.end.getTime()).not.toBe(end.getTime());
		});

		it("should throw InvalidArgumentError if beginDate is later than endDate", () => {
			expect.assertions(2);
			const begin = new Date();
			const end = new Date(Date.now() - 10000);
			const timeObject = { begin: begin.getTime(), end: end.getTime() };
			expect(() => new DateRange({ begin, end })).toThrow(InvalidArgumentError);
			expect(() => new DateRange(timeObject)).toThrow(InvalidArgumentError);
		});
		it("should throw InvalidArgumentError if beginDate is equal endDate", () => {
			expect.assertions(2);
			const begin = new Date();
			const end = new Date();
			const timeObject = { begin: begin.getTime(), end: end.getTime() };
			expect(() => new DateRange({ begin, end })).toThrow(InvalidArgumentError);
			expect(() => new DateRange(timeObject)).toThrow(InvalidArgumentError);
		});

		it("should throw InvalidArgumentError if any of date is invalid", () => {
			const begin = new Date(-(10 ** 20));
			const end = new Date();
			expect(() => new DateRange({ begin, end })).toThrow(InvalidArgumentError);
		});
	});
});
