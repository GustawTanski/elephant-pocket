import IValueObject from "../../../../../../lib/ts-extension/src/ValueObject";
import InvalidArgumentError from "../../../../SharedKernel/Error/InvalidArgumentError";

export default class DateRange implements IValueObject {
	private begin: Date;
	private end: Date;

	constructor(begin: Date | number, end: Date | number) {
		begin = this.handleDateType(begin);
		end = this.handleDateType(end);
		this.checkRange(begin, end);
		this.begin = begin;
		this.end = end;
	}

	private handleDateType(date: Date | number): Date {
		let numberDate: number = 0;
		if (date instanceof Date) numberDate = date.getTime();
		if (typeof date == "string") numberDate = date;
		const newDate = new Date(numberDate);
		this.checkDateValidity(newDate);
		return newDate;
	}

	private checkDateValidity(date: Date): void {
		if (Number.isNaN(date.getTime())) throw new InvalidArgumentError('"date" must be a valid date');
	}

	private checkRange(begin: Date, end: Date): void {
		if (begin.getTime() > end.getTime())
			throw new InvalidArgumentError("initial date must be lower than final");
	}

	getTimeInterval(): number {
		return this.end.getTime() - this.begin.getTime();
	}

	getTimeTillEnd(): number {
		const now = new Date();
		return this.end.getTime() - now.getTime();
	}

	isCurrent(): boolean {
		const now = new Date();
		const isAfter: boolean = now.getTime() > this.begin.getTime();
		const isBefore: boolean = now.getTime() < this.end.getTime();
		return isAfter && isBefore;
	}

	equals(comparedObject: DateRange): boolean {
		const areBeginsEqual: boolean = this.begin.getTime() == comparedObject.begin.getTime();
		const areEndsEqual: boolean = this.end.getTime() == comparedObject.end.getTime();
		return areBeginsEqual && areEndsEqual;
	}

	static createNext(dateRange: DateRange): DateRange {
		const newBegin = dateRange.begin;
		const interval = dateRange.getTimeInterval();
		const newEnd = new Date(newBegin.getTime() + interval);
		return new DateRange(newBegin, newEnd);
	}

	static createFromInterval(begin: Date, interval: number) {
		const end = new Date(begin.getTime() + interval);
		return new DateRange(begin, end);
	}
}
