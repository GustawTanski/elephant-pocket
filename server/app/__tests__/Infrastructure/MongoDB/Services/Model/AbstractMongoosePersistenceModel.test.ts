import AbstractMongoosePersistenceModel from "../../../../../src/Infrastructure/MongoDB/Services/Model/AbstractMongoosePersistenceModel";
import DomainObject from "../../../../../src/Core/Port/DomainObject";
import { Document, Model, Query } from "mongoose";
import AbstractUuidId from "../../../../../lib/ts-extension/src/Identity/AbstractUuidId";
import AppRuntimeError from "../../../../../src/Core/SharedKernel/Error/AppRuntimeError";

type T = DomainObject;
type S = Document;

const mapToDocument = jest.fn<S, [T]>();
const mapToDocumentProperties = jest.fn<{}, [T]>();

const model = {
	findById: jest.fn<Query<S | null>, [any]>(),
	findByIdAndDelete: jest.fn<Query<S | null>, [any]>()
};

class TestMongooseModel extends AbstractMongoosePersistenceModel<T, S> {
	mapToDocument(domainObject: T): S {
		return mapToDocument(domainObject);
	}
	mapToDocumentProperties(domainObject: T): {} {
		return mapToDocumentProperties(domainObject);
	}

	protected Model = (model as unknown) as Model<S, {}>;
}

class TestId extends AbstractUuidId {}

const returnedDocument = {} as Document;
const testMongooseModel = new TestMongooseModel();
let id: TestId;

describe("AbstractMongoosePersistenceModel", () => {
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

	it("#delete should call model.findByIdAndDelete with provided id", () => {
		givenId();
		whenDeleting();
		thenModelFindByIdAndDeleteHaveBeenCalledWithProvidedId();
	});

	async function whenDeleting() {
		await testMongooseModel.delete(id);
	}

	function thenModelFindByIdAndDeleteHaveBeenCalledWithProvidedId() {
		expect(model.findByIdAndDelete).toHaveBeenCalledWith(id);
	}

	it("#delete should throw AppRuntimeError when there is no object with provided id", async () => {
		givenIdAndModelFindByIdAndDeleteResolvingToNull();
		await thenDeleteRejectToBeInstanceOf(AppRuntimeError);
	});

	function givenIdAndModelFindByIdAndDeleteResolvingToNull() {
		givenId();
		model.findByIdAndDelete.mockResolvedValueOnce(null);
	}

	async function thenDeleteRejectToBeInstanceOf(error: any) {
		await expect(testMongooseModel.delete(id)).rejects.toBeInstanceOf(error);
	}
});
