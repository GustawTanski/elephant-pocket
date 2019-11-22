import AbstractMongooseModel from "../../../../src/Infrastructure/MongoDB/Model/AbstractMongooseModel";
import DomainObject from "../../../../src/Core/Port/DomainObject";
import { Document, Model, Query } from "mongoose";
import AbstractUuidId from "../../../../lib/ts-extension/src/Identity/AbstractUuidId";

type T = DomainObject;
type S = Document;

const mapToDocument = jest.fn<S, [T]>();
const mapToDocumentProperties = jest.fn<{}, [T]>();

class TestMongooseModel extends AbstractMongooseModel<T, S> {
	mapToDocument(domainObject: T): S {
		return mapToDocument(domainObject);
	}
	mapToDocumentProperties(domainObject: T): {} {
		return mapToDocumentProperties(domainObject);
	}
}

class TestId extends AbstractUuidId {}

const model = {
	findById: jest.fn<Query<S | null>, [any]>()
};
const returnedDocument = {} as Document;
const testMongooseModel = new TestMongooseModel((model as unknown) as Model<S, {}>);
let id: TestId;

describe("AbstractMongooseModel", () => {
	it("#findById should call model.findById with provided id", async () => {
		givenId();
		await whenFindByIdIsCalled();
		thenModelFindByIdHasBeenCalled();
	});

	function givenId() {
		id = new TestId();
	}

	async function whenFindByIdIsCalled() {
		await testMongooseModel.findById(id);
	}

	function thenModelFindByIdHasBeenCalled() {
		expect(model.findById).toHaveBeenCalledWith(id);
	}

	it("#findById should resolve to same document that model.findById resolved to", async () => {
		givenIdAndModelFindByIdResolveToDocument();
		await thenFindByIdResolveToSameDocument();
	});

	function givenIdAndModelFindByIdResolveToDocument() {
		givenId();
		model.findById.mockResolvedValueOnce(returnedDocument);
	}

	async function thenFindByIdResolveToSameDocument() {
		await expect(testMongooseModel.findById(id)).resolves.toBe(returnedDocument);
	}

	it("#findById should resolve to null if model.findById resolved to null", async () => {
		givenIdAndModelFindByIdResolveToNull();
		await thenFindByIdResolveToNull();
	});

	function givenIdAndModelFindByIdResolveToNull() {
		givenId();
		model.findById.mockResolvedValueOnce(null);
	}

	async function thenFindByIdResolveToNull() {
		await expect(testMongooseModel.findById(id)).resolves.toBe(null);
	}
});
