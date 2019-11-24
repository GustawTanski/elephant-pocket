import Budget from "../../../../../src/Core/Component/Budget/Domain/Budget/Budget";
import UserId from "../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId";
import DateRange from "../../../../../lib/ts-extension/src/DateRange/DateRange";
import {
	BudgetDocument,
	BudgetDocumentInput
} from "../../../../../src/Infrastructure/MongoDB/Model/Budget/BudgetSchema";
import BudgetModel from "../../../../../src/Infrastructure/MongoDB/Model/Budget/BudgetModel";

class TestBudget extends Budget {
	readonly type = "STRING";
}

const budgetModel = new BudgetModel();

let budget: Budget;
let document: BudgetDocument;
let documentProperties: BudgetDocumentInput;
describe("BudgetModel ", () => {
	it("#mapToDocument should return matching serialized Document", () => {
		givenBudget();
		whenMappingToDocument();
		thenDocumentMatchesBudget();
	});

	function givenBudget() {
		budget = new TestBudget({
			ownerId: new UserId(),
			minimalBalance: 0,
			dateRange: DateRange.createFromInterval(new Date(), 10 ** 8)
		});
	}

	function whenMappingToDocument() {
		document = budgetModel.mapToDocument(budget);
	}

	function thenDocumentMatchesBudget() {
		expect(document).toMatchObject(objectFromBudgetToMatch());
	}

	function objectFromBudgetToMatch() {
		return {
			ownerId: budget.ownerId.toString(),
			dateRange: {
				begin: budget.dateRange.begin,
				end: budget.dateRange.end
			},
			_id: budget.id.toString(),
			minimalBalance: budget.minimalBalance,
			history: expect.arrayContaining(budget.history),
			type: budget.type
		};
	}

	it("#mapToDocumentProperties should return matching serialized plain object", () => {
		givenBudget();
        whenMappingToDocumentProperties();
        thenDocumentPropertiesMatchesBudget();
	});

	function whenMappingToDocumentProperties() {
		documentProperties = budgetModel.mapToDocumentProperties(budget);
	}

	function thenDocumentPropertiesMatchesBudget() {
		expect(documentProperties).toMatchObject(objectFromBudgetToMatch());
	}
});
