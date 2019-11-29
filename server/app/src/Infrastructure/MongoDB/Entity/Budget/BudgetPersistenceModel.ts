import Budget from "../../../../Core/Component/Budget/Domain/Budget/Budget";
import { BudgetDocument, BudgetSchema, BudgetDocumentInput } from "./BudgetSchema";
import { model, Model } from "mongoose";
import AbstractMongoosePersistenceModel from "../../Services/Model/AbstractMongoosePersistenceModel";

export default class BudgetPersistenceModel extends AbstractMongoosePersistenceModel<Budget, BudgetDocument> {
	protected model = model<BudgetDocument>("Budget", BudgetSchema);

	mapToDocument(budget: Budget): BudgetDocument {
        const document: BudgetDocument = new this.model(this.mapToDocumentProperties(budget));
		return document;
	}

	mapToDocumentProperties(budget: Budget): BudgetDocumentInput {
		return {
			_id: budget.id.toString(),
			type: budget.type,
			ownerId: budget.ownerId.toString(),
			dateRange: {
				begin: budget.dateRange.begin,
				end: budget.dateRange.end
			},
			minimalBalance: budget.minimalBalance,
			history: [...budget.history]
		};
	}
}