export type BudgetEventName = string;

export interface BudgetEvent {
	name: BudgetEventName;
	payload: IBudgetEventPayload;
	creationDate: Date;
}
export interface IBudgetEventPayload {
	balanceChange: number;
}
