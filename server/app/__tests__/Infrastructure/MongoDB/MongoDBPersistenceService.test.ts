import MongoDBPersistenceService, {
	DomainObject
} from "../../../src/Infrastructure/MongoDB/MongoDBPersistenceService";
import AbstractUuidId from "../../../lib/ts-extension/src/Identity/AbstractUuidId";
import AppRuntimeError from "../../../src/Core/SharedKernel/Error/AppRuntimeError";

class TestId extends AbstractUuidId {}
const testModule = {
	create: jest.fn(),
	isExisting: jest.fn(),
	overwrite: jest.fn(),
	get name() {
		return "object";
	}
};
const persistenceService = new MongoDBPersistenceService<DomainObject>(testModule);

let domainObject: DomainObject;
let spy: jasmine.Spy;
let id: TestId;
describe("MongoDBPersistenceService", () => {
	it("#save should call .mongooseModule.isExisting with id from provided domain object", () => {
		givenDomainObjectAndSpyOnIsExisting();
		whenSaving();
		thenSpyHaveBeenCalledWithProvidedId();
	});

	function givenDomainObjectAndSpyOnIsExisting() {
		givenDomainObject();
		spy = spyOn(persistenceService["mongooseModule"], "isExisting");
	}

	function givenDomainObject() {
		id = new TestId();
		domainObject = {
			id
		};
	}

	function whenSaving() {
		persistenceService.save(domainObject);
	}

	function thenSpyHaveBeenCalledWithProvidedId() {
		expect(spy).toHaveBeenCalledWith(id);
	}

	it("#save should call .mongooseModule.create with provided domain object when there is no with same id", () => {
		givenDomainObjectAndSpyOnSave();
		whenFindByIdReturnsFalseWhileSaving();
		thenSpyHaveBeenCalledWithDomainObject();
	});
	function givenDomainObjectAndSpyOnSave() {
		givenDomainObject();
		spy = spyOn(persistenceService["mongooseModule"], "create");
	}

	function whenFindByIdReturnsFalseWhileSaving() {
		testModule.isExisting.mockReturnValueOnce(false);
		persistenceService.save(domainObject);
	}

	function thenSpyHaveBeenCalledWithDomainObject() {
		expect(spy).toHaveBeenCalledWith(domainObject);
	}

	it("#save should not call .mongooseModule.save when there is object with provided id", () => {
		givenDomainObjectAndSpyOnSave();
		whenIsExistingReturnsTrueWhileSaving();
		thenSpyHaveNotBeenCalled();
	});

	function whenIsExistingReturnsTrueWhileSaving() {
		testModule.isExisting.mockReturnValueOnce(true);
		persistenceService.save(domainObject);
	}

	function thenSpyHaveNotBeenCalled() {
		expect(spy).not.toBeCalled();
	}

	it("#save should call .mongooseModule.overwrite with provided domain object when there is one with provided id", () => {
		givenDomainObjectAndSpyOnOverwrite();
		whenIsExistingReturnsTrueWhileSaving();
		thenSpyHaveBeenCalledWithDomainObject();
	});

	function givenDomainObjectAndSpyOnOverwrite() {
		givenDomainObject();
		spy = spyOn(persistenceService["mongooseModule"], "overwrite");
	}

	it("#delete should .mongooseModule.findById with provided id", () => {
		givenId();
		whenIsExistingReturnsTrueWhileDeleting();
		thenIsExistingHaveBennCallWithProvidedId();
	});

	function givenId() {
		id = new TestId();
	}

	function whenIsExistingReturnsTrueWhileDeleting() {
		testModule.isExisting.mockReturnValueOnce(true);
		persistenceService.delete(id);
	}

	function thenIsExistingHaveBennCallWithProvidedId() {
		expect(testModule.isExisting).toHaveBeenCalledWith(id);
	}

	it("#delete should throw AppRuntimeError when .mongooseModule.findById returns null", () => {
		givenId();
		whenFindByIdReturnsFalse();
		thenDeleteThrows(AppRuntimeError);
	});

	function whenFindByIdReturnsFalse() {
		testModule.isExisting.mockReturnValueOnce(false);
	}

	function thenDeleteThrows(error: any) {
		expect(() => persistenceService.delete(id)).toThrow(error);
	}

	// it("#delete should call .mongooseModule.delete when .mongooseModule.findById return");
});
