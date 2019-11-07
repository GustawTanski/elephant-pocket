import BudgetEvent from "../Event/BudgetEvent";
import BudgetId from "../../../../SharedKernel/Component/Budget/Domain/Budget/BudgetId";
import DateRange from "../DateRange/DateRange";
import CreationEvent from "../Event/CreationEvent";
import InvalidArgumentError from "../../../../SharedKernel/Error/InvalidArgumentError";
import OutcomeEvent from "../Event/OutcomeEvent";
import IncomeEvent from "../Event/IncomeEvent";
import { thisExpression } from "@babel/types";

interface IBudgetInput {
	id?: BudgetId | string;
	history?: BudgetEvent[];
	dataRange: DateRange;
	minimalBalance: number;
}

export default abstract class Budget {
	private readonly _id: BudgetId;
	protected _history: BudgetEvent[];
	protected dataRange: DateRange;
	protected minimalBalance: number;

	constructor(base: IBudgetInput) {
		const id = this.handleIdType(base.id);
		const history = this.handleHistoryType(base.history);
		this.checkHistory(history);
		this._history = history;
		this.dataRange = base.dataRange;
		this._id = id;
		this.minimalBalance = base.minimalBalance;
	}

	private handleIdType(id?: BudgetId | string): BudgetId {
		if (id instanceof BudgetId) return new BudgetId(id.toString());
		else return new BudgetId(id);
	}

	private handleHistoryType(history?: BudgetEvent[]): BudgetEvent[] {
		return history || [new CreationEvent()];
	}

	private checkHistory(history: BudgetEvent[]): void {
		if (!(history[0] instanceof CreationEvent))
			throw new InvalidArgumentError('"history" must begin with CreationEvent');
	}

	get id() {
		return this._id;
	}

	pushEvent(event: BudgetEvent): void {
		this.checkPushedEvent(event);
		this._history.push(event);
	}

	private checkPushedEvent(event: BudgetEvent): void {
		if (!this.isEventExpectedInPushEvent(event))
			throw new InvalidArgumentError(`unexpected "event" type: ${event.constructor.name}`);
	}

	private isEventExpectedInPushEvent(event: BudgetEvent): boolean {
		const expectedEventTypes = [IncomeEvent, OutcomeEvent];
		return expectedEventTypes.some(EventType => event instanceof EventType);
	}

	setDataBoundary(dataRange: DateRange): void {
		this.dataRange = dataRange;
	}

	getBalance(): number {
		return this.getBalanceFromEventTable(this._history);
	}

	protected getBalanceFromEventTable(eventTable: BudgetEvent[]): number {
		const balance: number = eventTable.reduce<number>((prev, curr) => {
			return prev + curr.payload.balanceChange;
		}, 0);
		return balance;
	}
}
