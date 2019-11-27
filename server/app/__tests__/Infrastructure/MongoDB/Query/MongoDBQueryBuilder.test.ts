import MongoDBQueryBuilder, {
	ReadonlyFilter,
	GenericFilter
} from "../../../../src/Infrastructure/MongoDB/Query/MongoDBQueryBuilder";
import QueryObject from "../../../../src/Infrastructure/MongoDB/Query/QueryObject";

let collectionName: string;
let builder: MongoDBQueryBuilder;
let propertyName: string;
let number: number;
let query: Readonly<QueryObject>;
let filterData: ReadonlyFilter[];
const defaultFilter: ReadonlyFilter = {
	name: "where",
	value: ""
};
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
		const whereFilter: ReadonlyFilter = { name: "where", value: propertyName };
		expect(builder["filters"].some(filter => areFiltersEqual(filter, whereFilter))).toBe(true);
	}

	function areFiltersEqual(filter1: ReadonlyFilter, filter2: ReadonlyFilter): boolean {
		debugger;
		return filter1.name === filter2.name && filter1.value === filter2.value;
	}

	it.each<GenericFilter<any>["name"]>(["gt", "lt", "lte", "gte", "equals"])(
		"#%s should add matching filter",
		filterName => {
			givenCollectionNameAndNumber();
			whenAddingFilter(filterName);
			thenInTheFiltersIs(filterName);
		}
	);

	function givenCollectionNameAndNumber() {
		givenCollectionName();
		number = 23.5;
	}

	function whenAddingFilter(filterName: GenericFilter<any>["name"]) {
		builder = MongoDBQueryBuilder.create(collectionName)[filterName](number);
	}

	function thenInTheFiltersIs(filterName: GenericFilter<any>["name"]) {
		const checkedFilter: ReadonlyFilter = { name: filterName, value: number };
		expect(builder["filters"].some(filter => areFiltersEqual(filter, checkedFilter))).toBe(true);
	}

	it("#build should return query with empty filters when use after create only", () => {
		givenCollectionName();
		whenBuildingWithoutFilters();
		thenQueryObjectHasNotAnyFilters();
	});

	function whenBuildingWithoutFilters() {
		query = MongoDBQueryBuilder.create(collectionName).build();
	}

	function thenQueryObjectHasNotAnyFilters() {
		expect(query.filters.size).toBe(0);
	}

	it("#build should return query with matching filter list", () => {
		givenCollectionNameAndFourFilterData();
		whenBuildingWithManyFilters();
		thenQueryObjectHasMatchingFilters();
	});

	function givenCollectionNameAndFourFilterData() {
		collectionName = "dogs";
		filterData = [
			{
				name: "where",
				value: "months"
			},
			{
				name: "gt",
				value: 18
			},
			{
				name: "where",
				value: "breed"
			},
			{
				name: "equals",
				value: "corgi"
			}
		];
	}

	function whenBuildingWithManyFilters() {
		builder = MongoDBQueryBuilder.create(collectionName);
		query = filterData
			.reduce((builder, filter) => {
				if (filter.name == "where") return builder.where(filter.value);
				else return builder[filter.name](filter.value);
			}, builder)
			.build();
	}

	function thenQueryObjectHasMatchingFilters() {
		filterData.forEach((filter, index) => {
			const queryFilter = query.filters.get(index, defaultFilter);
			expect(filter).toStrictEqual(queryFilter);
		});
	}
});
