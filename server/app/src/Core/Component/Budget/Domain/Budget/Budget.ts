import BudgetEvent from "../Event/BudgetEvent";
import BudgetId from "../../../../SharedKernel/Component/Budget/Domain/Budget/BudgetId";
import DateRange from "../DateRange/DateRange";
import CreationEvent from "../Event/CreationEvent";
import InvalidArgumentError from "../../../../SharedKernel/Error/InvalidArgumentError";
import OutcomeEvent from "../Event/OutcomeEvent";
import IncomeEvent from "../Event/IncomeEvent";

export interface IBudgetInput {
	id?: BudgetId | string;
	history?: BudgetEvent[];
	dateRange: DateRange;
	minimalBalance: number;
}

interface FinalBudgetInput extends IBudgetInput {
	id: BudgetId;
	history: BudgetEvent[];
}

export default abstract class Budget {
	private readonly _id: BudgetId;
	protected _history: BudgetEvent[];
	protected _dateRange: DateRange;
	protected _minimalBalance: number;
	abstract readonly type: string;

	get id(): BudgetId {
		return this._id;
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

	constructor(base: IBudgetInput) {
		const { id, history, dateRange, minimalBalance } = this.handleArgumentsType(base);
		this.validateHistory(history);
		this._history = history;
		this._dateRange = dateRange;
		this._id = id;
		this._minimalBalance = minimalBalance;
	}

	private handleArgumentsType(base: IBudgetInput): FinalBudgetInput {
		const id = this.handleIdType(base.id);
		const history = this.handleHistoryType(base.history);
		return { ...base, id, history };
	}

	private handleIdType(id?: BudgetId | string): BudgetId {
		if (id instanceof BudgetId) return new BudgetId(id.toString());
		else return new BudgetId(id);
	}

	private handleHistoryType(history?: BudgetEvent[]): BudgetEvent[] {
		return history || [new CreationEvent()];
	}

	private validateHistory(history: BudgetEvent[]): void {
		if (!(history[0] instanceof CreationEvent))
			throw new InvalidArgumentError('"history" must begin with CreationEvent');
	}

	pushEvent(event: BudgetEvent): void {
		this.validatePushedEvent(event);
		this._history.push(event);
	}

	private validatePushedEvent(event: BudgetEvent): void {
		if (!this.isEventExpectedInPushEvent(event))
			throw new InvalidArgumentError(`unexpected "event" type: ${event.constructor.name}`);
	}

	private isEventExpectedInPushEvent(event: BudgetEvent): boolean {
		const expectedEventTypes = [IncomeEvent, OutcomeEvent];
		return expectedEventTypes.some(EventType => event instanceof EventType);
	}

	setDataBoundary(dataRange: DateRange): void {
		this._dateRange = dataRange;
	}
}
