import DateRange from "../../../../../../src/Core/Component/Budget/Domain/DateRange/DateRange";
import InvalidArgumentError from "../../../../../../src/Core/SharedKernel/Error/InvalidArgumentError";

describe("DateRange", () => {
	describe("#constructor", () => {
		it("should copy provided Date object", () => {
			expect.assertions(4);
			const begin = new Date();
			const end = new Date(Date.now() + 10000);
			const dateRange = new DateRange({ begin, end });
			begin.setDate(0);
			end.setDate(1);
			expect(dateRange["_begin"]).not.toBe(begin);
			expect(dateRange.begin.getTime()).not.toBe(begin.getTime());
			expect(dateRange["_end"]).not.toBe(end);
			expect(dateRange.end.getTime()).not.toBe(end.getTime());
		});

		it("should created matching dates when numbers are provided", () => {
			const begin = Date.now();
			const end = begin + 10 ** 4;
			const dateRange = new DateRange({ begin, end });
			expect(dateRange.begin.getTime()).toBe(begin);
			expect(dateRange.end.getTime()).toBe(end);
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

	describe("#getTimeInterval", () => {
		it("should return difference between begin and end", () => {
			const begin = Date.now();
			const end = begin + 10 ** 4;
			const dateRange = new DateRange({ begin, end });
			expect(dateRange.getTimeInterval()).toBe(end - begin);
		});
	});

	describe("#getTimeTillEnd", () => {
		it("should return approximate time till the end of date range", () => {
			const begin = new Date();
			const end = new Date(begin.getTime() + 10 ** 4);
			const dateRange = new DateRange({ begin, end });
			const approximateTimeTillEnd = Math.round(dateRange.getTimeTillEnd());
			const approximateEndNowDifference = Math.round(end.getTime() - Date.now());
			expect(approximateTimeTillEnd).toBe(approximateEndNowDifference);
		});
	});

	describe("#isCurrent", () => {
		it("should return true, when dateRange is current", () => {
			const begin = new Date(Date.now() - 10 ** 4);
			const end = new Date(Date.now() + 10 ** 4);
			const currentDateRange = new DateRange({ begin, end });
			expect(currentDateRange.isCurrent()).toBe(true);
		});
		it("should return false when dateRange is in the past", () => {
			const begin = new Date(0);
			const pastDateRange = DateRange.createFromInterval(begin, 1);
			expect(pastDateRange.isCurrent()).toBe(false);
		});
		it("should return false when dateRange is in the future", () => {
			const begin = new Date(Date.now() + 10 ** 5);
			const futureDateRange = DateRange.createFromInterval(begin, 10);
			expect(futureDateRange.isCurrent()).toBe(false);
		});
	});

	describe("#equals", () => {
		it("should return true when comparing to self", () => {
			const begin = new Date();
			const dateRange = DateRange.createFromInterval(begin, 1000);
			expect(dateRange.equals(dateRange)).toBe(true);
		});
		it("should return true when comparing to copied self", () => {
			const begin = new Date();
			const dateRange = DateRange.createFromInterval(begin, 1000);
			const copiedDateRange = new DateRange(dateRange);
			expect(dateRange.equals(copiedDateRange)).toBe(true);
			expect(dateRange).not.toBe(copiedDateRange);
		});
		it("should return false when comparing to not equal dateRange", () => {
			const begin = new Date();
			const dateRange = DateRange.createFromInterval(begin, 1000);
			const notEqualDateRange = DateRange.createNext(dateRange);
			expect(dateRange.equals(notEqualDateRange)).toBe(false);
		});
	});

	describe(".createNext", () => {
		it("should return new DateRange with end equals to argument's begin", () => {
			const begin = new Date();
			const end = new Date(begin.getTime() + 10 ** 4);
			const dateRange = new DateRange({ begin, end });
			const nextDateRange = DateRange.createNext(dateRange);
			expect(nextDateRange.begin.getTime()).toBe(end.getTime());
		});
		it("should return new DateRange with equal time interval", () => {
			const begin = new Date();
			const dateRange = DateRange.createFromInterval(begin, 10 ** 4);
			const nextDateRange = DateRange.createNext(dateRange);
			expect(dateRange.getTimeInterval()).toBe(nextDateRange.getTimeInterval());
		});
	});
	describe(".createFromInterval", () => {
		it("should return new Date with provided begin and time interval", () => {
			const begin = new Date();
			const timeInterval = 10 ** 5;
			const dateRange = DateRange.createFromInterval(begin, timeInterval);
			expect(dateRange.getTimeInterval()).toBe(timeInterval);
			expect(dateRange.begin.getTime()).toBe(begin.getTime());
		});
	});
});
