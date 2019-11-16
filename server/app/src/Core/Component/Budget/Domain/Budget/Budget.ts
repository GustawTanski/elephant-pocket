import BudgetEventImp from "../Event/BudgetEvent";
import BudgetId from "../../../../SharedKernel/Component/Budget/Domain/Budget/BudgetId";
import DateRange from "../DateRange/DateRange";
import CreationEvent from "../Event/CreationEvent";
import InvalidArgumentError from "../../../../SharedKernel/Error/InvalidArgumentError";
import OutcomeEvent from "../Event/OutcomeEvent";
import IncomeEvent from "../Event/IncomeEvent";
import UserId from "../../../../SharedKernel/Component/User/Domain/User/UserId";

export interface IBudgetInput {
	id?: BudgetId | string;
	ownerId: UserId | string;
	history?: BudgetEventImp[];
	dateRange: DateRange;
	minimalBalance: number;
}

interface FinalBudgetInput extends IBudgetInput {
	id: BudgetId;
	ownerId: UserId;
	history: BudgetEventImp[];
}

export default abstract class Budget {
	private readonly _id: BudgetId;
	private readonly _ownerId: UserId;
	protected _history: BudgetEventImp[];
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

	get history(): BudgetEventImp[] {
		return [...this._history];
	}

	constructor(base: IBudgetInput) {
		const { id, history, dateRange, minimalBalance, ownerId } = this.handleArgumentsType(base);
		this.validateHistory(history);
		this._history = history;
		this._dateRange = dateRange;
		this._id = id;
		this._ownerId = ownerId;
		this._minimalBalance = minimalBalance;
	}

	private handleArgumentsType(base: IBudgetInput): FinalBudgetInput {
		const id = this.handleIdType(base.id);
		const ownerId = this.handleOwnerIdType(base.ownerId);
		const history = this.handleHistoryType(base.history);
		return { ...base, ownerId, id, history };
	}

	private handleIdType(id?: BudgetId | string): BudgetId {
		if (id instanceof BudgetId) return new BudgetId(id.toString());
		else return new BudgetId(id);
	}

	private handleOwnerIdType(id?: UserId | string) {
		if (id instanceof UserId) return new UserId(id.toString());
		else return new UserId(id);
	}

	private handleHistoryType(history?: BudgetEventImp[]): BudgetEventImp[] {
		return history || [new CreationEvent()];
	}

	private validateHistory(history: BudgetEventImp[]): void {
		if (!(history[0] instanceof CreationEvent))
			throw new InvalidArgumentError('"history" must begin with CreationEvent');
	}

	pushEvent(event: BudgetEventImp): void {
		this.validatePushedEvent(event);
		this._history.push(event);
	}

	private validatePushedEvent(event: BudgetEventImp): void {
		if (!this.isEventExpectedInPushEvent(event))
			throw new InvalidArgumentError(`unexpected "event" type: ${event.constructor.name}`);
	}

	private isEventExpectedInPushEvent(event: BudgetEventImp): boolean {
		const expectedEventTypes = [IncomeEvent, OutcomeEvent];
		return expectedEventTypes.some(EventType => event instanceof EventType);
	}

	setDataBoundary(dataRange: DateRange): void {
		this._dateRange = dataRange;
	}
}
