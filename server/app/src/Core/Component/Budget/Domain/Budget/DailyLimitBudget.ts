import Budget from "./Budget";
export const DAILY_LIMIT = "DAILY_LIMIT";

export default class DailyLimitBudget extends Budget {
	readonly type = DAILY_LIMIT;
}
