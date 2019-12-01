import { UserDocument } from "../../../../../src/Infrastructure/MongoDB/Entity/User/UserSchema";
import UserId from "../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId";
import User from "../../../../../src/Core/Component/User/Domain/User/User";
import UserQueryModel from "../../../../../src/Infrastructure/MongoDB/Entity/User/UserQueryModel";
import AppLogicError from "../../../../../src/Core/SharedKernel/Error/AppLogicError";

const userQueryModel = new UserQueryModel();

let document: UserDocument;
let partialUser: Partial<User>;
let user: User;

describe("UserQueryModel", () => {
	it("#mapToPartialDomainObject should return matching plain object when provided document is full", () => {
		givenFullUserDocument();
		whenMappingToPartialUser();
		thenPartialUserMatchesDocumentAndIsPlain();
	});

	function givenFullUserDocument() {
		document = {
			_id: new UserId().toString(),
			email: "Jaren_Collins@hotmail.com",
			password: "vLr1WuVamg3F98C",
			name: "Lucious"
		} as UserDocument;
	}

	function whenMappingToPartialUser() {
		partialUser = userQueryModel.mapToPartialDomainObject(document);
	}

	function thenPartialUserMatchesDocumentAndIsPlain() {
		expect(partialUser).not.toBeInstanceOf(User);
		expect(partialUser).toMatchObject({
			name: document.name,
			email: document.email,
			password: document.password
		});
		if (partialUser.id) expect(partialUser.id.toString()).toBe(document._id);
		else expect(partialUser.id).toBe(undefined);
	}

	it("#mapToPartialDomainObject should return matching plain object when provided document misses _id ", () => {
		givenUserDocumentWithoutId();
		whenMappingToPartialUser();
		thenPartialUserMatchesDocumentAndIsPlain();
	});

	function givenUserDocumentWithoutId() {
		document = {
			email: "Flo23@gmail.com",
			password: "IWYUxGcSP96PFMB",
			name: "Rusty"
		} as UserDocument;
	}

	it("#mapToPartialDomainObject should return matching plain object when provided document misses email ", () => {
		givenUserDocumentWithoutEmail();
		whenMappingToPartialUser();
		thenPartialUserMatchesDocumentAndIsPlain();
	});

	function givenUserDocumentWithoutEmail() {
		document = {
			_id: new UserId().toString(),
			password: "IWYUxGcSP96PFMB",
			name: "Rusty"
		} as UserDocument;
	}

	it("#mapToPartialDomainObject should return empty object when provided document misses all properties", () => {
		givenEmptyDocument();
		whenMappingToPartialUser();
		thenPartialUserMatchesDocumentAndIsPlain();
	});

	function givenEmptyDocument() {
		document = {} as UserDocument;
	}

	it("#mapToHydratedDomainObject should return matching instance of User", () => {
		givenFullUserDocument();
		whenMappingToHydratedUser();
		thenUserMatchesDocument();
	});

	function whenMappingToHydratedUser() {
		user = userQueryModel.mapToHydratedDomainObject(document);
	}

	function thenUserMatchesDocument() {
		expect(user).toMatchObject({
			name: document.name,
			email: document.email,
			password: document.password
		});
		expect(user.id.toString()).toBe(document._id);
	}

	it("#mapToHydratedDomainObject should throw AppLogicError if any required property is missing", () => {
		givenUserDocumentWithoutEmail();
		thenMapToHydratedDomainObjectThrowsAppLogicError();
	});

	function thenMapToHydratedDomainObjectThrowsAppLogicError() {
		expect(() => userQueryModel.mapToHydratedDomainObject(document)).toThrow(AppLogicError);
	}
});
