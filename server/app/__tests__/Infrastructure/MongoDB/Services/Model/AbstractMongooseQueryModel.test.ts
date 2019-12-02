import AbstractMongooseQueryModel from "../../../../../src/Infrastructure/MongoDB/Services/Model/AbstractMongooseQueryModel";
import DomainObject from "../../../../../src/Core/Port/DomainObject";
import { Document, Query, Model } from "mongoose";

type T = DomainObject;
type S = Document;

const testModel = {
	find: jest.fn<Query<S[]>, []>()
};

class TestMongooseQueryModel extends AbstractMongooseQueryModel<T, S> {
	protected Model = (testModel as unknown) as Model<S, {}>;
	mapToHydratedDomainObject() {
		return (undefined as unknown) as T;
	}

	mapToPartialDomainObject() {
		return (undefined as unknown) as Partial<T>;
	}
}

const mongooseQueryModel = new TestMongooseQueryModel();

let queryToReturn: Query<S[]>;
let returnedQuery: Query<S[]>;

describe("MongooseQueryModel", () => {
	beforeEach(() => {
		testModel.find.mockReset();
	});

	it("#find should call model.find", () => {
		whenFinding();
		thenModelFindHasBeenCalled();
	});

	function whenFinding() {
		returnedQuery = mongooseQueryModel.find();
	}

	function thenModelFindHasBeenCalled() {
		expect(testModel.find).toHaveBeenCalled();
	}

	it("#find should return whatever model.find returns", () => {
		givenModelFindReturningFakeQuery();
		whenFinding();
		thenFindReturnedSameFakeQuery();
	});

	function givenModelFindReturningFakeQuery() {
		queryToReturn = {} as Query<S[]>;
		testModel.find.mockReturnValueOnce(queryToReturn);
	}

	function thenFindReturnedSameFakeQuery() {
		expect(returnedQuery).toBe(queryToReturn);
	}
});
