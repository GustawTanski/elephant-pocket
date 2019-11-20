import AbstractMongooseModule, { Mapper } from "../../../src/Infrastructure/MongoDB/MongooseModule";
import DomainObject from "../../../src/Core/Port/DomainObject";
import AbstractUuidId from "../../../lib/ts-extension/src/Identity/AbstractUuidId";
import { Document, Model } from "mongoose";

jest.mock("mongoose");

class TestModule<T extends DomainObject, S extends Document> extends AbstractMongooseModule<T, S> {
	readonly name: string = "test";
}

type T = DomainObject;
type S = Document;

class TestId extends AbstractUuidId {}
const testMapper = {
	toDocument: jest.fn<S, [T]>(),
	toDocumentProperties: jest.fn<{}, [T]>(),
	findById: jest.fn<Promise<S>, [T["id"]]>()
};

const testModule = new TestModule(testMapper as Mapper<T, S>);
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
		testMapper.toDocument.mockReset();
		testMapper.toDocumentProperties.mockReset();
	});
	it("#create should call mapper.toDocument ", async () => {
		givenDomainObject();
		await whenCreating();
		thenMapperToDocumentHasBeenCalledWithProvidedDomainObject();
	});

	function givenDomainObject() {
		domainObject = {
			id: new TestId()
		};
	}

	async function whenCreating() {
		testMapper.toDocument.mockReturnValueOnce(returnedDocument);
		await testModule.create(domainObject);
	}

	function thenMapperToDocumentHasBeenCalledWithProvidedDomainObject() {
		expect(testMapper.toDocument).toHaveBeenCalledWith(domainObject);
	}

	it("#create should call returnedDocument.save", async () => {
		givenDomainObject();
		await whenCreating();
		thenReturnedDocumentSaveHasBeenCalled();
	});

	function thenReturnedDocumentSaveHasBeenCalled() {
		expect(returnedDocument.save).toHaveBeenCalled();
	}

	it("#overwrite should call mapper.toDocumentProperties", async () => {
		givenDomainObject();
		await whenOverwriting();
		thenMapperToDocumentPropertiesHasBeenCalledWithDomainObject();
	});

	async function whenOverwriting() {
		testMapper.toDocumentProperties.mockReturnValueOnce(returnedProperties);
		testMapper.findById.mockResolvedValueOnce(returnedDocument);
		await testModule.overwrite(domainObject);
	}

	function thenMapperToDocumentPropertiesHasBeenCalledWithDomainObject() {
		expect(testMapper.toDocumentProperties).toHaveBeenCalledWith(domainObject);
	}

	it("#overwrite should call mapper.findById with provided id", async () => {
		givenDomainObject();
		await whenOverwriting();
		thenMapperFindByIdHasBeenCalledWithDomainObjectId();
	});

	function thenMapperFindByIdHasBeenCalledWithDomainObjectId() {
		expect(testMapper.findById).toHaveBeenCalledWith(domainObject.id);
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

	it("#isExisting should call mapper.findById with provided id", async () => {
		givenId();
		whenCheckingDomainObjectExistence();
		thenMapperFindByIdHasBeenCalledWithId();
	});

	function givenId() {
		id = new TestId();
	}

	async function whenCheckingDomainObjectExistence() {
		isExisting = await testModule.isExisting(id);
	}

	function thenMapperFindByIdHasBeenCalledWithId() {
		expect(testMapper.findById).toHaveBeenCalledWith(id);
	}
});
