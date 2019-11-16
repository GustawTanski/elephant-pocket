import DateRange from "../../../../../../src/Core/Component/Budget/Domain/DateRange/DateRange";
import InvalidArgumentError from "../../../../../../src/Core/SharedKernel/Error/InvalidArgumentError";

let begin: Date;
let end: Date;
let beginTime: number;
let endTime: number;
let dateRange: DateRange;
let timeInterval: number;
let timeTillEnd: number;
let comparedDateRange: DateRange;
let nextDateRange: DateRange;
let dateRangeFromInterval: DateRange;

describe("DateRange", () => {
	it("constructor should copy provided Date object", () => {
		givenValidBeginAndEnd();
		whenConstructingDateRange();
		thenProvidedDatesAreCopied();
	});

	function givenValidBeginAndEnd() {
		begin = new Date();
		end = new Date(Date.now() + 10000);
	}

	function whenConstructingDateRange() {
		dateRange = new DateRange({ begin, end });
	}

	function thenProvidedDatesAreCopied() {
		expect(dateRange["_begin"]).not.toBe(begin);
		expect(dateRange.begin.getTime()).toBe(begin.getTime());
		expect(dateRange["_end"]).not.toBe(end);
		expect(dateRange.end.getTime()).toBe(end.getTime());
	}

	it("constructor should created matching dates when numbers are provided", () => {
		givenValidBeginAndEndAsNumbers();
		whenConstructingDateRangeFromNumbers();
		thenMatchingDatesAreCreated();
	});

	function givenValidBeginAndEndAsNumbers() {
		beginTime = Date.now();
		endTime = beginTime + 10 ** 4;
	}

	function whenConstructingDateRangeFromNumbers() {
		dateRange = new DateRange({ begin: beginTime, end: endTime });
	}

	function thenMatchingDatesAreCreated() {
		expect(dateRange.begin.getTime()).toBe(beginTime);
		expect(dateRange.end.getTime()).toBe(endTime);
	}

	it("constructor should throw InvalidArgumentError if begin is later than end (and they are Dates)", () => {
		givenEndLaterThanBegin();
		thenDateRangeConstructionFails();
	});

	function givenEndLaterThanBegin() {
		begin = new Date();
		end = new Date(begin.getTime() - 10 ** 4);
	}

	function thenDateRangeConstructionFails() {
		expect(() => new DateRange({ begin, end })).toThrow(InvalidArgumentError);
		expect(() => new DateRange({ begin: begin.getTime(), end: end.getTime() })).toThrow(
			InvalidArgumentError
		);
	}

	it("constructor should throw InvalidArgumentError if beginDate is equal endDate", () => {
		givenBeginEqualToEnd();
		thenDateRangeConstructionFails();
	});

	function givenBeginEqualToEnd() {
		begin = new Date();
		end = new Date(begin);
	}

	it("constructor should throw InvalidArgumentError if any of date is invalid", () => {
		const begin = new Date(-(10 ** 20));
		const end = new Date();
		expect(() => new DateRange({ begin, end })).toThrow(InvalidArgumentError);
	});

	it("#getTimeInterval should return difference between begin and end", () => {
		givenValidBeginEndAndDateRangeMadeWithThem();
		whenGettingTimeInterval();
		thenTimeIntervalEqualsDifferenceBetweendBeginAndEnd();
	});

	function givenValidBeginEndAndDateRangeMadeWithThem() {
		givenValidBeginAndEnd();
		dateRange = new DateRange({ begin, end });
	}

	function whenGettingTimeInterval() {
		timeInterval = dateRange.getTimeInterval();
	}

	function thenTimeIntervalEqualsDifferenceBetweendBeginAndEnd() {
		expect(timeInterval).toBe(end.getTime() - begin.getTime());
	}

	it("#getTimeTillEnd should return approximate time till the end of date range", () => {
		givenValidBeginEndAndDateRangeMadeWithThem();
		whenGettingTimeTillEnd();
		thenTimeTillEndApproximatesTimeTillEndDate();
	});

	function whenGettingTimeTillEnd() {
		timeTillEnd = dateRange.getTimeTillEnd();
	}

	function thenTimeTillEndApproximatesTimeTillEndDate() {
		const approximateTimeTillEnd = Math.round(timeTillEnd);
		const approximateEndNowDifference = Math.round(end.getTime() - Date.now());
		expect(approximateTimeTillEnd).toBe(approximateEndNowDifference);
	}

	it("#isCurrent should return true, when dateRange is current", () => {
		givenCurrentDateRange();
		thenDateRangeShouldBeCurrent();
	});

	function givenCurrentDateRange() {
		const begin = new Date(Date.now() - 10 ** 4);
		const end = new Date(Date.now() + 10 ** 4);
		dateRange = new DateRange({ begin, end });
	}

	function thenDateRangeShouldBeCurrent() {
		expect(dateRange.isCurrent()).toBe(true);
	}

	it("#isCurrent should return false when dateRange is in the past", () => {
		givenPastDateRange();
		thenDateRangeShouldNotBeCurrent();
	});

	function givenPastDateRange() {
		const begin = new Date(0);
		dateRange = DateRange.createFromInterval(begin, 1);
	}

	function thenDateRangeShouldNotBeCurrent() {
		expect(dateRange.isCurrent()).toBe(false);
	}

	it("#isCurrent should return false when dateRange is in the future", () => {
		givenFutureDateRange();
		thenDateRangeShouldNotBeCurrent();
	});

	function givenFutureDateRange() {
		const begin = new Date(Date.now() + 10 ** 5);
		dateRange = DateRange.createFromInterval(begin, 10);
	}

	it("#equals should return true when comparing to self", () => {
		givenDateRange();
		whenComparingToItself();
		thenComparisonShouldReturnTrue();
	});

	function givenDateRange() {
		const begin = new Date();
		dateRange = DateRange.createFromInterval(begin, 1000);
	}

	function whenComparingToItself() {
		comparedDateRange = dateRange;
	}

	function thenComparisonShouldReturnTrue() {
		expect(dateRange.equals(comparedDateRange)).toBe(true);
	}

	it("#equals should return true when comparing to copied self", () => {
		givenDateRange();
		whenComparingToCopiedItself();
		thenComparisonShouldReturnTrue();
	});

	function whenComparingToCopiedItself() {
		comparedDateRange = new DateRange(dateRange);
	}

	it("#equals should return false when comparing to not equal dateRange", () => {
		givenDateRange();
		whenComparingToNotEqualDate();
		thenComparisonShouldReturnFalse();
	});

	function whenComparingToNotEqualDate() {
		comparedDateRange = DateRange.createNext(dateRange);
	}

	function thenComparisonShouldReturnFalse() {
		expect(dateRange.equals(comparedDateRange)).toBe(false);
	}

	it(".createNext should return new DateRange with end equals to argument's begin", () => {
		givenDateRange();
		whenCreatingNextDateRange();
		thenEndOfGivenAndBeginOfNextEqual();
	});

	function whenCreatingNextDateRange() {
		nextDateRange = DateRange.createNext(dateRange);
	}

	function thenEndOfGivenAndBeginOfNextEqual() {
		expect(nextDateRange.begin.getTime()).toBe(dateRange.end.getTime());
	}

	it(".createNext should return new DateRange with equal time interval", () => {
		givenDateRange();
		whenCreatingNextDateRange();
		thenGivenDateIntervalAndNextDateIntervalEqual();
	});

	function thenGivenDateIntervalAndNextDateIntervalEqual() {
		expect(dateRange.getTimeInterval()).toBe(nextDateRange.getTimeInterval());
	}

	it(".createFromInterval should return new Date with provided begin and time interval", () => {
		givenBeginAndInterval();
		whenCreatingDateRangeFromInterval();
		thenNewDateRangeHasProvidedBeginAndInterval();
	});

	function givenBeginAndInterval() {
		begin = new Date();
		timeInterval = 10 ** 6;
	}

	function whenCreatingDateRangeFromInterval() {
		dateRangeFromInterval = DateRange.createFromInterval(begin, timeInterval);
	}

	function thenNewDateRangeHasProvidedBeginAndInterval() {
		expect(dateRangeFromInterval.getTimeInterval()).toBe(timeInterval);
		expect(dateRangeFromInterval.begin.getTime()).toBe(begin.getTime());
	}
});
