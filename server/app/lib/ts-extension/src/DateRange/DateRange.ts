import IValueObject from "../ValueObject";
import InvalidArgumentError from "../../../../src/Core/SharedKernel/Error/InvalidArgumentError";

interface FinalDateRangeInput {
	begin: Date;
	end: Date;
}

interface DateRangeInput {
	begin: Date | number;
	end: Date | number;
}

export default class DateRange implements IValueObject {
	private readonly _begin: Date;
	private readonly _end: Date;

	get begin(): Date {
		return new Date(this._begin);
	}

	get end(): Date {
		return new Date(this._end);
	}

	constructor({ begin, end }: DateRangeInput) {
		({ begin, end } = this.handleArgumentsType(begin, end));
		this._begin = begin;
		this._end = end;
	}

	private handleArgumentsType(begin: Date | number, end: Date | number): FinalDateRangeInput {
		begin = this.handleDateType(begin);
		end = this.handleDateType(end);
		this.validateDateRange(begin, end);
		return { begin, end };
	}

	private handleDateType(date: Date | number): Date {
		const time: number = this.getTimeFromIndefiniteDate(date);
		const copiedDate = new Date(time);
		this.validateDate(copiedDate);
		return copiedDate;
	}

	private getTimeFromIndefiniteDate(date: Date | number) {
		let time: number = 0;
		if (date instanceof Date) time = date.getTime();
		if (typeof date == "number") time = date;
		return time;
	}

	private validateDate(date: Date): void {
		if (Number.isNaN(date.getTime())) throw new InvalidArgumentError('"date" must be a valid date');
	}

	private validateDateRange(begin: Date, end: Date): void {
		if (begin.getTime() >= end.getTime())
			throw new InvalidArgumentError("initial date must be lower than final");
	}

	getTimeInterval(): number {
		return this._end.getTime() - this._begin.getTime();
	}

	// in milliseconds
	getTimeTillEnd(): number {
		const now = Date.now();
		return this._end.getTime() - now;
	}

	isCurrent(): boolean {
		return this.isAfterBegin() && this.isBeforeEnd();
	}
	private isAfterBegin(): boolean {
		return Date.now() > this._begin.getTime();
	}

	private isBeforeEnd(): boolean {
		return Date.now() < this._end.getTime();
	}

	equals(comparedObject: DateRange): boolean {
		const areBeginsEqual: boolean = this.isEqualToBegin(comparedObject._begin);
		const areEndsEqual: boolean = this.isEqualToEnd(comparedObject._end);
		return areBeginsEqual && areEndsEqual;
	}

	private isEqualToBegin(comparedDate: Date): boolean {
		return this.areDatesEqual(this._begin, comparedDate);
	}
	private isEqualToEnd(comparedDate: Date): boolean {
		return this.areDatesEqual(this._end, comparedDate);
	}

	private areDatesEqual(firstDate: Date, secondDate: Date): boolean {
		return firstDate.getTime() == secondDate.getTime();
	}

	static createNext(dateRange: DateRange): DateRange {
		const begin = dateRange._end;
		const interval = dateRange.getTimeInterval();
		const end = new Date(begin.getTime() + interval);
		return new DateRange({ begin, end });
	}

	static createFromInterval(begin: Date, interval: number) {
		const end = new Date(begin.getTime() + interval);
		return new DateRange({ begin, end });
	}
}
