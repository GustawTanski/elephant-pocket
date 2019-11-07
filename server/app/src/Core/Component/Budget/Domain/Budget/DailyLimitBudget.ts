import Budget from "./Budget";
import BudgetEvent from "../Event/BudgetEvent";

const MILLISECONDS_IN_DAY = 86400000;

export default class DailyLimitBudget extends Budget {
	getTodaysLimit(): number {
		const moneyLeftAtMidnight: number = this.getTodaysMidnightBalance() - this.minimalBalance;
		const daysLeftToEndOfBillingPeriod: number = Math.ceil(
			this.dataRange.getTimeTillEnd() / MILLISECONDS_IN_DAY
		);
		return moneyLeftAtMidnight / daysLeftToEndOfBillingPeriod;
	}

	private getTodaysMidnightBalance(): number {
		const historyTillMidnight = this.getHistoryTillMidnight();
		return this.getBalanceFromEventTable(historyTillMidnight);
	}

	private getHistoryTillMidnight(): BudgetEvent[] {
		const todaysMidnightTime: number = this.getTodaysMidnightTime();
		return this._history.filter(event => {
			event.creationDate.getTime() <= todaysMidnightTime;
		});
	}

	getTodaysBalance(): number {
		const todaysExpenses = this.getTodaysExpenses();
		const todaysLimit = this.getTodaysLimit();
		return todaysLimit - todaysExpenses;
	}

	private getTodaysExpenses(): number {
		const historyAfterMidnight = this.getHistoryAfterMidnight();
		return this.getBalanceFromEventTable(historyAfterMidnight);
	}

	private getHistoryAfterMidnight(): BudgetEvent[] {
		const todaysMidnightTime: number = this.getTodaysMidnightTime();
		return this._history.filter(event => {
			event.creationDate.getTime() > todaysMidnightTime;
		});
	}

	private getTodaysMidnightTime(): number {
		return this.getMidnightDate(new Date()).getTime();
	}

	private getMidnightDate(date: Date): Date {
		const midnight = new Date(date);
		midnight.setHours(0);
		midnight.setMinutes(0);
		midnight.setSeconds(0);
		midnight.setMilliseconds(0);
		return midnight;
	}
}
