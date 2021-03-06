import Budget from "../../../../../src/Core/Component/Budget/Domain/Budget/Budget";
import UserId from "../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId";
import DateRange from "../../../../../lib/ts-extension/src/DateRange/DateRange";
import {
	BudgetDocument,
	BudgetDocumentInput
} from "../../../../../src/Infrastructure/MongoDB/Entity/Budget/BudgetSchema";
import BudgetPersistenceModel from "../../../../../src/Infrastructure/MongoDB/Entity/Budget/BudgetPersistenceModel";

class TestBudget extends Budget {
	readonly type = "TEST";
}

const budgetModel = new BudgetPersistenceModel();

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
		expect(document).toMatchObject(getObjectToMatchFromBudget());
	}

	function getObjectToMatchFromBudget() {
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
		expect(documentProperties).toMatchObject(getObjectToMatchFromBudget());
	}
});
