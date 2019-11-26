import MongooseQueryService from "../../../src/Infrastructure/MongoDB/MongooseQueryService";
import DomainObject from "../../../src/Core/Port/DomainObject";
import { Document, Model, Query } from "mongoose";
import { List } from "immutable";
import AbstractUuidId from "../../../lib/ts-extension/src/Identity/AbstractUuidId";
import UuidGenerator from "../../../lib/ts-extension/src/Uuid/UuidGenerator";
import {
	QueryObject,
	Filter,
	filterFactory
} from "../../../src/Infrastructure/MongoDB/MongoDBQueryBuilder";

const testModel = {
	find: jest.fn<Query<S>, []>()
};
type T = DomainObject;
type S = Document;
class TestId extends AbstractUuidId {}
class TestQueryService extends MongooseQueryService<T, S> {
	protected mapToDomainObjectData(document: S): T {
		return {
			id: new TestId(document._id)
		};
	}
	protected model = (testModel as unknown) as Model<S, {}>;
}
const queryService = new TestQueryService();
const thenValueMock = jest.fn();
const queryMock = {
	where: jest.fn<Query<S[]>, [string]>(),
	gt: jest.fn<Query<S[]>, [any]>(),
	lt: jest.fn<Query<S[]>, [any]>(),
	lte: jest.fn<Query<S[]>, [any]>(),
	gte: jest.fn<Query<S[]>, [any]>(),
	equals: jest.fn<Query<S[]>, [any]>(),
	then(cb: (val: any) => void) {
		cb(thenValueMock());
	}
};
const singleMockFunction = jest.fn<Query<S[]>, [any]>();
const singleQueryMock = {
	where: singleMockFunction,
	gt: singleMockFunction,
	equals: singleMockFunction,
	lt: singleMockFunction,
	lte: singleMockFunction,
	gte: singleMockFunction,
	then: queryMock.then
};
const defaultFilter: Filter<any> = {
	name: "where",
	value: ""
};

let queryObject: QueryObject;
let returnedList: List<Partial<T>>;
let foundDocuments: Array<Document>;

describe("MongooseQueryService", () => {
	beforeEach(() => {
		testModel.find.mockReset();
		testModel.find.mockReturnValue((queryMock as unknown) as Query<S>);
		queryMock.where.mockReset();
		queryMock.where.mockReturnThis();
		queryMock.gt.mockReset();
		queryMock.gt.mockReturnThis();
		queryMock.equals.mockReset();
		queryMock.equals.mockReturnThis();
		singleMockFunction.mockReset();
		singleMockFunction.mockReturnThis();
		thenValueMock.mockReset();
		thenValueMock.mockReturnValue(new Array<Document>());
	});

	it("#query should call model.find with no arguments", async () => {
		givenEmptyObjectQuery();
		await whenQuerying();
		thenModelFindHasBeenCalledWithNoArguments();
	});

	function givenEmptyObjectQuery() {
		queryObject = {
			filters: List<Filter<any>>()
		};
	}

	async function whenQuerying() {
		returnedList = await queryService.query(queryObject);
	}

	function thenModelFindHasBeenCalledWithNoArguments() {
		expect(testModel.find).toHaveBeenCalledWith();
	}

	it("#query should call returned query.where with provided value if there is where in filters", async () => {
		givenQueryObjectWithWhereFilter();
		await whenQuerying();
		thenQueryWhereHasBeenCalledWithProvidedValue();
	});

	function givenQueryObjectWithWhereFilter() {
		const rawFilters: Filter<any>[] = [
			{
				name: "where",
				value: "dog"
			}
		];
		queryObject = {
			filters: List<Filter<any>>(rawFilters.map(filterFactory))
		};
	}

	function thenQueryWhereHasBeenCalledWithProvidedValue() {
		const firstFilter = queryObject.filters.get(0) as Filter<any>;
		expect(queryMock.where).toHaveBeenCalledWith(firstFilter.value);
	}

	it("#query should not call returned query.where if there is not where in filters", async () => {
		givenEmptyObjectQuery();
		await whenQuerying();
		thenQueryWhereHasNotBeenCalled();
	});

	function thenQueryWhereHasNotBeenCalled() {
		expect(queryMock.where).not.toHaveBeenCalled();
	}

	it("#query should call returned query.where twice if there are to where filters", async () => {
		givenQueryObjectWithTwoWhere();
		await whenQuerying();
		thenQueryWhereHasBeenCalledTwice();
	});

	function givenQueryObjectWithTwoWhere() {
		const rawList: Filter<any>[] = [
			{
				name: "where",
				value: "dogs"
			},
			{
				name: "where",
				value: "cats"
			}
		];
		queryObject = {
			filters: List(rawList.map(filterFactory))
		};
	}

	function thenQueryWhereHasBeenCalledTwice() {
		expect(queryMock.where).toHaveBeenCalledTimes(2);
	}

	it("#query should call returned query.where twice with provided values if there are two where filters", async () => {
		givenQueryObjectWithTwoWhere();
		await whenQuerying();
		thenQueryWhereHasBeenCalledTwiceWithProvidedValues();
	});

	function thenQueryWhereHasBeenCalledTwiceWithProvidedValues() {
		expect(queryMock.where).toHaveBeenNthCalledWith(
			1,
			queryObject.filters.get(0, defaultFilter).value
		);
		expect(queryMock.where).toHaveBeenNthCalledWith(
			2,
			queryObject.filters.get(1, defaultFilter).value
		);
	}

	it("#query should call returned query corresponding methods with provided values", async () => {
		givenFourFiltersQueryObject();
		await whenQuerying();
		thenQueryCorrespondingMethodsHaveBeenCalledWithProvidedValues();
	});

	function givenFourFiltersQueryObject() {
		const rawFilters: Filter<any>[] = [
			{
				name: "where",
				value: "name"
			},
			{
				name: "equals",
				value: "Gus"
			},
			{
				name: "where",
				value: "age"
			},
			{
				name: "gt",
				value: 18
			}
		];
		const filters = List<Filter<any>>(rawFilters.map(filterFactory));
		queryObject = {
			filters
		};
	}

	function thenQueryCorrespondingMethodsHaveBeenCalledWithProvidedValues() {
		queryObject.filters.forEach(query => {
			expect(queryMock[query.name]).toHaveBeenCalledWith(query.value);
		});
	}

	it("#query should call returned query corresponding methods in correct order", async () => {
		givenFourFiltersQueryObject();
		await whenQueryingWithSingleMock();
		thenQueryCorrespondingMethodsHaveBeenCalledWithCorrectOrder();
	});

	async function whenQueryingWithSingleMock() {
		testModel.find.mockReset();
		testModel.find.mockReturnValueOnce((singleQueryMock as unknown) as Query<S>);
		await queryService.query(queryObject);
	}

	function thenQueryCorrespondingMethodsHaveBeenCalledWithCorrectOrder() {
		queryObject.filters.forEach((query, index) => {
			expect(singleQueryMock[query.name]).toHaveBeenNthCalledWith(index + 1, query.value);
		});
	}

	it("#query should return empty List if returned query resolve to empty Array", async () => {
		givenEmptyQueryObjectAndQueryResolvingToEmptyArray();
		await whenQuerying();
		thenReturnedListIsEmpty();
	});

	function givenEmptyQueryObjectAndQueryResolvingToEmptyArray() {
		givenEmptyObjectQuery();
		thenValueMock.mockReset();
		foundDocuments = new Array<S>();
		thenValueMock.mockReturnValueOnce(foundDocuments);
	}

	function thenReturnedListIsEmpty() {
		expect(returnedList.size).toBe(0);
	}

	it("#query should return List with same size and order as Array query resolve to", async () => {
		givenEmptyObjectQueryAndQueryResolvingToNotEmptyArray();
		await whenQuerying();
		thenReturnedListMatchesThatArray();
	});

	function givenEmptyObjectQueryAndQueryResolvingToNotEmptyArray() {
		givenEmptyObjectQuery();
		thenValueMock.mockReset();
		foundDocuments = [
			{ _id: UuidGenerator.generateAsString() },
			{ _id: UuidGenerator.generateAsString() },
			{ _id: UuidGenerator.generateAsString() },
			{ _id: UuidGenerator.generateAsString() },
			{ _id: UuidGenerator.generateAsString() }
		] as Array<S>;
		thenValueMock.mockReturnValueOnce(foundDocuments);
	}

	function thenReturnedListMatchesThatArray() {
		expect.assertions(1 + returnedList.size);
		expect(returnedList.size).toBe(foundDocuments.length);
		returnedList.forEach((object, index) => {
			if (object.id) expect(object.id.toString()).toBe(foundDocuments[index]._id);
		});
	}
});
