import MongoDBQueryBuilder, {
	filterFactory
} from "../../../src/Infrastructure/MongoDB/MongoDBQueryBuilder";

let collectionName: string;
let builder: MongoDBQueryBuilder;
let propertyName: string;
let number: number;
describe("MongoDBQueryBuilder", () => {
	it(".create should return instanceof builder with collection name saved", () => {
		givenCollectionName();
		whenCreating();
		thenBuilderHasSavedCollectionName();
	});

	function givenCollectionName() {
		collectionName = "users";
	}

	function whenCreating() {
		builder = MongoDBQueryBuilder.create(collectionName);
	}

	function thenBuilderHasSavedCollectionName() {
		expect(builder["collectionName"]).toBe(collectionName);
	}

	it("#where should add 'where' filter ", () => {
		givenCollectionNameAndPropertyName();
		whenAddingWhereFilter();
		thenWhereFilterIsInTheFilters();
	});

	function givenCollectionNameAndPropertyName() {
		givenCollectionName();
		propertyName = "name";
	}

	function whenAddingWhereFilter() {
		builder = MongoDBQueryBuilder.create(collectionName).where(propertyName);
	}

	function thenWhereFilterIsInTheFilters() {
		const whereFilter = filterFactory({ name: "where", value: propertyName });
		expect(builder["filters"].includes(whereFilter)).toBe(true);
	}

	it("#gt should add 'gt' filter", () => {
		givenCollectionNameAndNumber();
		whenAddingGtFilter();
		thenGtFilterIsInTheFilters();
	});

	function givenCollectionNameAndNumber() {
		givenCollectionName();
		number = 23.5;
	}

	function whenAddingGtFilter() {
		builder = MongoDBQueryBuilder.create(collectionName).gt(number);
	}

	function thenGtFilterIsInTheFilters() {
		const gtFilter = filterFactory({ name: "gt", value: number });
		expect(builder["filters"].includes(gtFilter)).toBe(true);
	}

	it("#lt should add 'lt' filter", () => {
		givenCollectionNameAndNumber();
        whenAddingLtFilter();
        thenLtFilterIsInTheFilters();
	});

	function whenAddingLtFilter() {
		builder = MongoDBQueryBuilder.create(collectionName).lt(number);
	}

	function thenLtFilterIsInTheFilters() {
		const ltFilter = filterFactory({ name: "lt", value: number });
		expect(builder["filters"].includes(ltFilter)).toBe(true);
	}
});
