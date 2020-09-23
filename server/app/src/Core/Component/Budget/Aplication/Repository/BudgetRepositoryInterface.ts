import Budget from "../../Domain/Budget/Budget";

export default interface BudgetRepository {
    save: (budget: Budget) => Promise<void>
}
