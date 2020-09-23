import BudgetRepository from "../Repository/BudgetRepositoryInterface";
import DateRange from "../../../../../../lib/ts-extension/src/DateRange/DateRange";
import Budget from "../../Domain/Budget/Budget";
import BudgetFactory from "../../Domain/Budget/BudgetFactory";
import NewBudgetDTO from "../DTO/NewBudgetDTO";

export default class BudgetService {
	private repository: BudgetRepository;

	constructor(repository: BudgetRepository) {
		this.repository = repository;
	}

	async createBudget(
		DTO: NewBudgetDTO
	) {
		const dateRange = new DateRange(DTO.dateRange);
		const budget: Budget = BudgetFactory.produce({ ...DTO, dateRange });
		await this.repository.save(budget);
	}
}
