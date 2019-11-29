import User from "../../../../../src/Core/Component/User/Domain/User/User";
import {
	UserDocumentInput,
	UserDocument
} from "../../../../../src/Infrastructure/MongoDB/Entity/User/UserSchema";
import UserPersistenceModel from "../../../../../src/Infrastructure/MongoDB/Entity/User/UserPersistenceModel";

const userPersistenceModel = new UserPersistenceModel();

let user: User;
let documentProperties: UserDocumentInput;
let document: UserDocument;
describe("UserPersistenceModel", () => {
	it("#mapToDocumentProperties should return object matching to provided user", () => {
		givenUser();
		whenMappingToDocumentProperties();
		thenReturnedPropertiesMatchesUser();
	});

	function givenUser() {
		user = new User({
			email: "Titus89@hotmail.com",
			password: "we0vi22yFR_6deO",
			name: "Stanton"
		});
	}

	function whenMappingToDocumentProperties() {
		documentProperties = userPersistenceModel.mapToDocumentProperties(user);
	}

	function thenReturnedPropertiesMatchesUser() {
		expect(documentProperties).toMatchObject(getObjectToMatchFromUser());
	}

	function getObjectToMatchFromUser() {
		return {
			_id: user.id.toString(),
			name: user.name,
			password: user.password,
			email: user.email
		};
	}

	it("#mapToDocument should return object matching to provided user", () => {
		givenUser();
		whenMappingToDocument();
		thenReturnedDocumentMatchesUser();
	});

	function whenMappingToDocument() {
		document = userPersistenceModel.mapToDocument(user);
	}

	function thenReturnedDocumentMatchesUser() {
		expect(document).toMatchObject(getObjectToMatchFromUser());
	}
});
