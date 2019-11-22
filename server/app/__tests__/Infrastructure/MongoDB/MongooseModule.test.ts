import MongooseModuleImp from "../../../src/Infrastructure/MongoDB/MongooseModule";
import DomainObject from "../../../src/Core/Port/DomainObject";
import AbstractUuidId from "../../../lib/ts-extension/src/Identity/AbstractUuidId";
import { Document } from "mongoose";
import { MongooseModel } from "../../../src/Infrastructure/MongoDB/Model/AbstractMongooseModel";

type T = DomainObject;
type S = Document;

class TestId extends AbstractUuidId {}
const testModel = {
	mapToDocument: jest.fn<S, [T]>(),
	mapToDocumentProperties: jest.fn<{}, [T]>(),
	findById: jest.fn<Promise<S | null>, [T["id"]]>(),
	delete: jest.fn<Promise<void>, [T["id"]]>()
};

const testModule = new MongooseModuleImp(testModel as MongooseModel<T, S>, "test");
const returnedDocument: S = ({
	save: jest.fn<Promise<S>, []>(),
	overwrite: jest.fn<S, [T]>()
} as unknown) as S;
const returnedProperties = {};
let domainObject: T;
let isExisting: boolean;
let id: T["id"];

describe("AbstractMongooseModule", () => {
	beforeEach(() => {
		testModel.mapToDocument.mockReset();
		testModel.mapToDocumentProperties.mockReset();
	});
	it("#create should call model.toDocument ", async () => {
		givenDomainObject();
		await whenCreating();
		thenModelToDocumentHasBeenCalledWithProvidedDomainObject();
	});

	function givenDomainObject() {
		domainObject = {
			id: new TestId()
		};
	}

	async function whenCreating() {
		testModel.mapToDocument.mockReturnValueOnce(returnedDocument);
		await testModule.create(domainObject);
	}

	function thenModelToDocumentHasBeenCalledWithProvidedDomainObject() {
		expect(testModel.mapToDocument).toHaveBeenCalledWith(domainObject);
	}

	it("#create should call returnedDocument.save", async () => {
		givenDomainObject();
		await whenCreating();
		thenReturnedDocumentSaveHasBeenCalled();
	});

	function thenReturnedDocumentSaveHasBeenCalled() {
		expect(returnedDocument.save).toHaveBeenCalled();
	}

	it("#overwrite should call model.toDocumentProperties", async () => {
		givenDomainObject();
		await whenOverwriting();
		thenModelToDocumentPropertiesHasBeenCalledWithDomainObject();
	});

	async function whenOverwriting() {
		testModel.mapToDocumentProperties.mockReturnValueOnce(returnedProperties);
		testModel.findById.mockResolvedValueOnce(returnedDocument);
		await testModule.overwrite(domainObject);
	}

	function thenModelToDocumentPropertiesHasBeenCalledWithDomainObject() {
		expect(testModel.mapToDocumentProperties).toHaveBeenCalledWith(domainObject);
	}

	it("#overwrite should call model.findById with provided id", async () => {
		givenDomainObject();
		await whenOverwriting();
		thenModelFindByIdHasBeenCalledWithDomainObjectId();
	});

	function thenModelFindByIdHasBeenCalledWithDomainObjectId() {
		expect(testModel.findById).toHaveBeenCalledWith(domainObject.id);
	}

	it("#overwrite should call returnedDocument.overwrite with returned properties", async () => {
		givenDomainObject();
		await whenOverwriting();
		thenReturnedDocumentOverwriteHasBeenCalledWithReturnedProperties();
	});

	function thenReturnedDocumentOverwriteHasBeenCalledWithReturnedProperties() {
		expect(returnedDocument.overwrite).toHaveBeenCalledWith(returnedProperties);
	}

	it("#overwrite should call returnedDocument.save", async () => {
		givenDomainObject();
		await whenOverwriting();
		thenReturnedDocumentSaveHasBeenCalled();
	});

	it("#isExisting should call model.findById with provided id", async () => {
		givenId();
		await whenCheckingDomainObjectExistence();
		thenModelFindByIdHasBeenCalledWithId();
	});

	function givenId() {
		id = new TestId();
	}

	async function whenCheckingDomainObjectExistence() {
		isExisting = await testModule.isExisting(id);
	}

	function thenModelFindByIdHasBeenCalledWithId() {
		expect(testModel.findById).toHaveBeenCalledWith(id);
	}

	it("#isExisting should return false when model.findById resolve to null", async () => {
		givenIdAndFindByIdResolvingToNull();
		whenCheckingDomainObjectExistence();
		await thenIsExistingResolveTo(false);
	});

	function givenIdAndFindByIdResolvingToNull() {
		givenId();
		testModel.findById.mockResolvedValueOnce(null);
	}

	function thenIsExistingResolveTo(value: boolean) {
		expect(isExisting).toBe(value);
	}

	it("#isExisting should return true when model.findById resolve to instance of Document", async () => {
		givenIdAndFindByIdResolvingToDocument();
		await whenCheckingDomainObjectExistence();
		thenIsExistingResolveTo(true);
	});

	function givenIdAndFindByIdResolvingToDocument() {
		givenId();
		testModel.findById.mockResolvedValueOnce(returnedDocument);
	}

	it("#delete should call model.delete", async () => {
		givenId();
		await whenDeleting();
		thenModelDeleteHasBeenCalledWithId();
	});

	async function whenDeleting() {
		await testModule.delete(id);
	}

	function thenModelDeleteHasBeenCalledWithId() {
		expect(testModel.delete).toHaveBeenCalledWith(id);
	}
});
