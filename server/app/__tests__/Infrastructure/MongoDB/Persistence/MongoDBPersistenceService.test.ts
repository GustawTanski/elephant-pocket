import MongoDBPersistenceService from "../../../../src/Infrastructure/MongoDB/Persistence/MongoDBPersistenceService";
import AbstractUuidId from "../../../../lib/ts-extension/src/Identity/AbstractUuidId";
import AppRuntimeError from "../../../../src/Core/SharedKernel/Error/AppRuntimeError";
import DomainObject from "../../../../src/Core/Port/DomainObject";

class TestId extends AbstractUuidId {}
const testModule = {
	create: jest.fn(),
	isExisting: jest.fn(),
	overwrite: jest.fn(),
	delete: jest.fn(),
	get name() {
		return "object";
	}
};
const persistenceService = new MongoDBPersistenceService<DomainObject>(testModule);

let domainObject: DomainObject;
let id: TestId;
describe("MongoDBPersistenceService", () => {
	beforeEach(() => {
		testModule.create.mockReset();
		testModule.isExisting.mockReset();
		testModule.overwrite.mockReset();
	});
	it("#save should call .mongooseModule.isExisting with id from provided domain object", () => {
		givenDomainObjectAndId();
		whenSaving();
		thenIsExistingHaveBennCallWithProvidedId();
	});

	function givenDomainObjectAndId() {
		id = new TestId();
		domainObject = {
			id
		};
	}

	function whenSaving() {
		persistenceService.save(domainObject);
	}

	function thenIsExistingHaveBennCallWithProvidedId() {
		expect(testModule.isExisting).toHaveBeenCalledWith(id);
	}

	it("#save should call .mongooseModule.create with provided domain object when there is no with same id", async () => {
		givenDomainObject();
		await whenFindByIdResolveToBeFalseWhileSaving();
		thenCreateHaveBeenCalledWithDomainObject();
	});

	function givenDomainObject() {
		domainObject = {
			id: new TestId()
		};
	}

	async function whenFindByIdResolveToBeFalseWhileSaving() {
		testModule.isExisting.mockResolvedValueOnce(false);
		await persistenceService.save(domainObject);
	}

	function thenCreateHaveBeenCalledWithDomainObject() {
		expect(testModule.create).toHaveBeenCalledWith(domainObject);
	}

	it("#save should not call .mongooseModule.create when there is object with provided id", async () => {
		givenDomainObject();
		await whenIsExistingRetusolveToTrueWhileSaving();
		thenCreateHaveNotBeenCalled();
		thenOverwriteHaveBeenCalledWithDomainObject();
	});

	async function whenIsExistingRetusolveToTrueWhileSaving() {
		testModule.isExisting.mockResolvedValueOnce(true);
		await persistenceService.save(domainObject);
	}

	function thenCreateHaveNotBeenCalled() {
		expect(testModule.create).not.toHaveBeenCalled();
	}

	function thenOverwriteHaveBeenCalledWithDomainObject() {
		expect(testModule.overwrite).toHaveBeenCalledWith(domainObject);
	}

	it("#delete should call .mongooseModule.isExisting with provided id", async () => {
		givenId();
		await whenIsExistingResolveToTrueWhileDeleting();
		thenIsExistingHaveBennCallWithProvidedId();
	});

	function givenId() {
		id = new TestId();
	}

	async function whenIsExistingResolveToTrueWhileDeleting() {
		testModule.isExisting.mockResolvedValueOnce(true);
		await persistenceService.delete(id);
	}

	it("#delete should throw AppRuntimeError when .mongooseModule.findById returns false", async () => {
		givenId();
		whenFindByIdResolveToFalse();
		await thenDeleteRejectsToInstanceOf(AppRuntimeError);
	});

	function whenFindByIdResolveToFalse() {
		testModule.isExisting.mockResolvedValueOnce(false);
	}

	async function thenDeleteRejectsToInstanceOf(error: any) {
		expect.assertions(1);
		await expect(persistenceService.delete(id)).rejects.toBeInstanceOf(error);
	}

	it("#delete should call .mongooseModule.delete when .mongooseModule.findById returns true", async () => {
		givenId();
		await whenFindByIdResolveToTrueWhileDeleting();
		thenMongooseDeleteHaveBeenCalledWithProvidedId();
	});

	async function whenFindByIdResolveToTrueWhileDeleting() {
		testModule.isExisting.mockResolvedValueOnce(true);
		await persistenceService.delete(id);
	}

	function thenMongooseDeleteHaveBeenCalledWithProvidedId() {
		expect(testModule.delete).toHaveBeenCalledWith(id);
	}
});
