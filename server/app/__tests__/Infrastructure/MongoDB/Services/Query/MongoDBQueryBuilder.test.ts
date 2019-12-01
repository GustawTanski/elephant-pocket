import MongoDBQueryObject from "../../../../../src/Core/Port/Persistence/MongoDB/MongoDBQueryObjectPort";
import MongoDBQueryBuilder from "../../../../../src/Infrastructure/MongoDB/Services/Query/MongoDBQueryBuilder";
import {
	ReadonlyFilter,
	GenericFilter
} from "../../../../../src/Core/Port/Persistence/MongoDB/MongoDBQueryFilterPort";

const defaultFilter: ReadonlyFilter = {
	name: "where",
	value: ""
};

let builder: MongoDBQueryBuilder;
let propertyName: string;
let number: number;
let query: Readonly<MongoDBQueryObject>;
let filterData: ReadonlyFilter[];

describe("MongoDBQueryBuilder", () => {
	it("#where should add 'where' filter ", () => {
		givenPropertyName();
		whenAddingWhereFilter();
		thenWhereFilterIsInTheFilters();
	});

	function givenPropertyName() {
		propertyName = "name";
	}

	function whenAddingWhereFilter() {
		builder = MongoDBQueryBuilder.create().where(propertyName);
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
			givenNumber();
			whenAddingFilter(filterName);
			thenInTheFiltersIs(filterName);
		}
	);

	function givenNumber() {
		number = 23.5;
	}

	function whenAddingFilter(filterName: GenericFilter<any>["name"]) {
		builder = MongoDBQueryBuilder.create()[filterName](number);
	}

	function thenInTheFiltersIs(filterName: GenericFilter<any>["name"]) {
		const checkedFilter: ReadonlyFilter = { name: filterName, value: number };
		expect(builder["filters"].some(filter => areFiltersEqual(filter, checkedFilter))).toBe(true);
	}

	it("#build should return query with empty filters when use after create only", () => {
		whenBuildingWithoutFilters();
		thenQueryObjectHasNotAnyFilters();
	});

	function whenBuildingWithoutFilters() {
		query = MongoDBQueryBuilder.create().build();
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
		builder = MongoDBQueryBuilder.create();
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

	it("#build should return query with hydrate == false if #hydrate hasn't been called", () => {
		whenBuildingWithoutHydrate();
		thenReturnedQueryHasHydratePropertyFalse();
	});

	function whenBuildingWithoutHydrate() {
		query = MongoDBQueryBuilder.create().build();
	}

	function thenReturnedQueryHasHydratePropertyFalse() {
		expect(query.hydrate).toBe(false);
	}

	it("#build should return query with hydrate == true if #hydrate has been called", () => {
		whenBuildingWithHydrate();
		thenReturnedQueryHasHydratePropertyTrue();
	});

	function whenBuildingWithHydrate() {
		query = MongoDBQueryBuilder.create()
			.hydrate()
			.build();
	}

	function thenReturnedQueryHasHydratePropertyTrue() {
		expect(query.hydrate).toBe(true);
	}
});
