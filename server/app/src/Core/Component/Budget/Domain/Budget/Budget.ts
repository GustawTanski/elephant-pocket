import AbstractBudgetEvent from "../Event/AbstractBudgetEvent";
import BudgetId from "../../../../SharedKernel/Component/Budget/Domain/Budget/BudgetId";
import DateRange from "../../../../../../lib/ts-extension/src/DateRange/DateRange";
import UserId from "../../../../SharedKernel/Component/User/Domain/User/UserId";
import { BudgetEvent } from "../Event/BudgetEvent";

export interface BudgetInput {
	id?: BudgetId;
	ownerId: UserId;
	history?: BudgetEvent[];
	dateRange: DateRange;
	minimalBalance: number;
}

export default abstract class Budget {
	private readonly _id: BudgetId = new BudgetId();
	private readonly _ownerId: UserId;
	protected _history: BudgetEvent[] = new Array<BudgetEvent>();
	protected _dateRange: DateRange;
	protected _minimalBalance: number;
	abstract readonly type: string;

	get id(): BudgetId {
		return this._id;
	}

	get ownerId(): UserId {
		return this._ownerId;
	}

	get dateRange(): DateRange {
		return this._dateRange;
	}

	get minimalBalance(): number {
		return this._minimalBalance;
	}

	get history(): BudgetEvent[] {
		return [...this._history];
	}

	constructor({ id, history, dateRange, minimalBalance, ownerId }: BudgetInput) {
		this._history = history ? [...history] : this._history;
		this._dateRange = dateRange;
		this._id = id || this._id;
		this._ownerId = ownerId;
		this._minimalBalance = minimalBalance;
	}

	pushEvent(event: BudgetEvent): void {
		this._history.push(event);
	}

	setDateRange(dataRange: DateRange): void {
		this._dateRange = dataRange;
	}
}
