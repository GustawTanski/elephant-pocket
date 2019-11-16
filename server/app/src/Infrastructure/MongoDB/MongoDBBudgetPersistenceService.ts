import { BudgetModel, BudgetMapper, BudgetDocument } from "./Model/Budget";
import Budget from "../../Core/Component/Budget/Domain/Budget/Budget";
import BudgetId from "../../Core/SharedKernel/Component/Budget/Domain/Budget/BudgetId";
import AppRuntimeError from "../../Core/SharedKernel/Error/AppRuntimeError";

export default class MongoDBBudgetPersistenceService {
	private BudgetModel = BudgetModel;
	constructor() {}

	async save(budget: Budget): Promise<void> {
		const persistedBudget = await BudgetModel.findById(budget.id.toString());
		if (!persistedBudget) await this.addNewBudget(budget);
		else await this.overwritePersistedBudget(persistedBudget, budget);
	}

	private async addNewBudget(budget: Budget): Promise<void> {
		const budgetDocumentProperties = BudgetMapper.toDocumentProperties(budget);
		const persistedDocument = new BudgetModel(budgetDocumentProperties);
		await persistedDocument.save();
	}

	private async overwritePersistedBudget(
		persistedBudget: BudgetDocument,
		budget: Budget
	): Promise<void> {
		const budgetDocumentProperties = BudgetMapper.toDocumentProperties(budget);
		persistedBudget.overwrite(budgetDocumentProperties);
		await persistedBudget.save();
	}

	async delete(id: BudgetId):Promise<void> {
		const deletedBudget = this.BudgetModel.findById(id.toString());
		if (!deletedBudget) throw new AppRuntimeError("there is no budget with such id");
	}
}
