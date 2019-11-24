import AbstractMongooseModel from "../AbstractMongooseModel";
import Budget from "../../../../Core/Component/Budget/Domain/Budget/Budget";
import { BudgetDocument, BudgetSchema, BudgetDocumentInput } from "./BudgetSchema";
import { model } from "mongoose";

export default class BudgetModel extends AbstractMongooseModel<Budget, BudgetDocument> {
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
