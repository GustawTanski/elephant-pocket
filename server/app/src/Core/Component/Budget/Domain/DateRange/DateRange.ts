import IValueObject from "../../../../../../lib/ts-extension/src/ValueObject";
import InvalidArgumentError from "../../../../SharedKernel/Error/InvalidArgumentError";

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
		Object.seal(this._begin);
		this._end = end;
		Object.seal(this._end);
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
		if (typeof date == "string") time = date;
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

	getTimeTillEnd(): number {
		const now = new Date();
		return this._end.getTime() - now.getTime();
	}

	isCurrent(): boolean {
		const now = new Date();
		const isAfter: boolean = now.getTime() > this._begin.getTime();
		const isBefore: boolean = now.getTime() < this._end.getTime();
		return isAfter && isBefore;
	}

	equals(comparedObject: DateRange): boolean {
		const areBeginsEqual: boolean = this._begin.getTime() == comparedObject._begin.getTime();
		const areEndsEqual: boolean = this._end.getTime() == comparedObject._end.getTime();
		return areBeginsEqual && areEndsEqual;
	}

	static createNext(dateRange: DateRange): DateRange {
		const begin = dateRange._begin;
		const interval = dateRange.getTimeInterval();
		const end = new Date(begin.getTime() + interval);
		return new DateRange({ begin, end });
	}

	static createFromInterval(begin: Date, interval: number) {
		const end = new Date(begin.getTime() + interval);
		return new DateRange({ begin, end });
	}
}
