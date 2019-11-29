import MongooseQueryService from "../../../../../src/Infrastructure/MongoDB/Services/Query/MongooseQueryService";
import DomainObject from "../../../../../src/Core/Port/DomainObject";
import { Document, Query } from "mongoose";
import { List } from "immutable";
import AbstractUuidId from "../../../../../lib/ts-extension/src/Identity/AbstractUuidId";
import UuidGenerator from "../../../../../lib/ts-extension/src/Uuid/UuidGenerator";
import { ReadonlyFilter } from "../../../../../src/Infrastructure/MongoDB/Services/Query/MongoDBQueryBuilder";
import QueryObject from "../../../../../src/Infrastructure/MongoDB/Services/Query/QueryObject";
import { MongooseQueryModel } from "../../../../../src/Infrastructure/MongoDB/Services/Model/AbstractMongooseQueryModel";

type T = DomainObject;
type S = Document;

const testModel = {
	find: jest.fn<Query<S>, []>(),
	mapToPartialDomainObject: jest.fn<Partial<T>, [S]>(),
	mapToHydratedDomainObject: jest.fn<T, [S]>()
};

class TestId extends AbstractUuidId {}

const queryService = new MongooseQueryService<T, S>(
	(testModel as unknown) as MongooseQueryModel<T, S>
);
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
const defaultFilter: ReadonlyFilter = {
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
		testModel.mapToPartialDomainObject.mockReset();
		testModel.mapToPartialDomainObject.mockImplementation(
			(document: S): Partial<T> => {
				return {
					id: new TestId(document._id)
				};
			}
		);
		testModel.mapToHydratedDomainObject.mockReset();
	});

	it("#query should call model.find with no arguments", async () => {
		givenEmptyQuery();
		await whenQuerying();
		thenModelFindHasBeenCalledWithNoArguments();
	});

	function givenEmptyQuery() {
		queryObject = {
			filters: List<ReadonlyFilter>(),
			hydrate: false
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
		const filters: ReadonlyFilter[] = [
			{
				name: "where",
				value: "dog"
			}
		];
		queryObject = {
			filters: List(filters),
			hydrate: false
		};
	}

	function thenQueryWhereHasBeenCalledWithProvidedValue() {
		const firstFilter: ReadonlyFilter = queryObject.filters.get(0, defaultFilter);
		expect(queryMock.where).toHaveBeenCalledWith(firstFilter.value);
	}

	it("#query should not call returned query.where if there is not where in filters", async () => {
		givenEmptyQuery();
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
		const filters: ReadonlyFilter[] = [
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
			filters: List(filters),
			hydrate: false
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
		const filters: ReadonlyFilter[] = [
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
		queryObject = {
			filters: List(filters),
			hydrate: false
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
		givenEmptyQuery();
		thenValueMock.mockReset();
		foundDocuments = new Array<S>();
		thenValueMock.mockReturnValueOnce(foundDocuments);
	}

	function thenReturnedListIsEmpty() {
		expect(returnedList.size).toBe(0);
	}

	it("#query should return List with same size and order as Array query resolve to", async () => {
		givenEmptyQuery();
		await whenQueryingAndResponseIsNotEmpty();
		thenReturnedListMatchesThatArray();
	});

	async function whenQueryingAndResponseIsNotEmpty() {
		foundDocuments = [
			{ _id: UuidGenerator.generateAsString() },
			{ _id: UuidGenerator.generateAsString() },
			{ _id: UuidGenerator.generateAsString() },
			{ _id: UuidGenerator.generateAsString() },
			{ _id: UuidGenerator.generateAsString() }
		] as Array<S>;
		thenValueMock.mockReset();
		thenValueMock.mockReturnValueOnce(foundDocuments);
		returnedList = await queryService.query(queryObject);
	}

	function thenReturnedListMatchesThatArray() {
		expect.assertions(1 + returnedList.size);
		expect(returnedList.size).toBe(foundDocuments.length);
		returnedList.forEach((object, index) => {
			if (object.id) expect(object.id.toString()).toBe(foundDocuments[index]._id);
		});
	}

	it("#query should call model.mapToPartialDomainObject if query.hydrate == false", async () => {
		givenEmptyQueryWithHydrateOptionFalse();
		await whenQueryingAndResponseIsNotEmpty();
		thenModelMapToPartialDomainObjectHasBeenCalled();
	});

	function givenEmptyQueryWithHydrateOptionFalse() {
		queryObject = {
			filters: List<ReadonlyFilter>(),
			hydrate: false
		};
	}

	function thenModelMapToPartialDomainObjectHasBeenCalled() {
		expect(testModel.mapToPartialDomainObject).toHaveBeenCalled();
	}

	it("#query should not call model.mapToHydratedDomainObject if query.hydrate == false", async () => {
		givenEmptyQueryWithHydrateOptionFalse();
		await whenQueryingAndResponseIsNotEmpty();
		thenModelMapToHydratedDomainObjectHasNotBeenCalled();
	});

	function thenModelMapToHydratedDomainObjectHasNotBeenCalled() {
		expect(testModel.mapToHydratedDomainObject).not.toHaveBeenCalled();
	}

	it("query should call model.mapToHydratedDomainObject if query.hydrate == true", async () => {
		givenEmptyQueryWithHydrateOptionTrue();
		await whenQueryingAndResponseIsNotEmpty();
		thenModelMapToHydratedDomainObjectHasBeenCalled();
	});

	function givenEmptyQueryWithHydrateOptionTrue() {
		queryObject = {
			filters: List<ReadonlyFilter>(),
			hydrate: true
		};
	}

	function thenModelMapToHydratedDomainObjectHasBeenCalled() {
		expect(testModel.mapToHydratedDomainObject).toHaveBeenCalled();
	}

	it("query should not call model.mapToPartialDomainObject if query.hydrate == true", async () => {
		givenEmptyQueryWithHydrateOptionTrue();
		await whenQueryingAndResponseIsNotEmpty();
		thenModelMapToPartialDomainObjectHasNotBeenCalled();
	});

	function thenModelMapToPartialDomainObjectHasNotBeenCalled() {
		expect(testModel.mapToPartialDomainObject).not.toHaveBeenCalled();
	}
});
