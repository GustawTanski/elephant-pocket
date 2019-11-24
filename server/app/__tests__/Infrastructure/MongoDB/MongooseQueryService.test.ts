import MongooseQueryService, {
	QueryObject,
	Filter
} from "../../../src/Infrastructure/MongoDB/MongooseQueryService";
import DomainObject from "../../../src/Core/Port/DomainObject";
import { Document, Model, Query } from "mongoose";

const testModel = {
	find: jest.fn<Query<S>, []>()
};
type T = DomainObject;
type S = Document;
class TestQueryService extends MongooseQueryService<T, S> {
	model = (testModel as unknown) as Model<S, {}>;
}
const queryService = new TestQueryService();
const queryMock = {
	where: jest.fn<Query<S>, [string]>()
};
const possibleFilterNames = ["where"];

let queryObject: QueryObject;

describe("MongooseQueryService", () => {
	beforeEach(() => {
		testModel.find.mockReset();
		testModel.find.mockReturnValue((queryMock as unknown) as Query<S>);
		queryMock.where.mockReset();
		queryMock.where.mockReturnThis();
	});

	it("#query should call model.find with no arguments", async () => {
		givenEmptyObjectQuery();
		await whenQuerying();
		thenModelFindHasBeenCalledWithNoArguments();
	});

	function givenEmptyObjectQuery() {
		queryObject = {
			filters: new Array<Filter>()
		};
	}

	async function whenQuerying() {
		await queryService.query(queryObject);
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
		queryObject = {
			filters: [
				{
					name: "where",
					value: "dog"
				}
			]
		};
	}

	function thenQueryWhereHasBeenCalledWithProvidedValue() {
		expect(queryMock.where).toHaveBeenCalledWith(queryObject.filters[0].value);
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
		queryObject = {
			filters: [
				{
					name: "where",
					value: "dogs"
				},
				{
					name: "where",
					value: "cats"
				}
			]
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
		expect(queryMock.where).toHaveBeenNthCalledWith(1, queryObject.filters[0].value);
		expect(queryMock.where).toHaveBeenNthCalledWith(2, queryObject.filters[1].value);
	}

	// it("#query should call returned query corresponding methods with provided values in correct order", async () => {
	// 	givenRandomQueryObject();
	// 	await whenQuerying();
	// }

	// 	function givenRandomQueryObject() {
	// 		queryObject = {
	// 			filters
	// 		}
	// 	}
});
