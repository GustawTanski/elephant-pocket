export default interface NewBudgetDTO {
	type: string;
	dateRange: { begin: number; end: number };
	minimalBalance: number;
}
