import User from "../../../../../../../src/Core/Component/User/Domain/User/User";
import UserRepositoryImp from "../../../../../../../src/Core/Component/User/Aplication/Repository/MongoDB/UserRepository";
import UserId from "../../../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId";
import { MongoDBQueryBuilder } from "../../../../../../../src/Core/Port/Persistence/MongoDB/MongoDBQueryBuilderPort";
import QueryObject from "../../../../../../../src/Core/Port/Persistence/QueryObjectPort";
import { List } from "immutable";
import AppLogicError from "../../../../../../../src/Core/SharedKernel/Error/AppLogicError";
import EmptyQueryError from "../../../../../../../src/Core/Port/Persistence/Error/EmptyQueryError";

const persistenceService = {
	save: jest.fn<Promise<void>, [User]>(),
	delete: jest.fn<Promise<void>, [UserId]>()
};
const queryBuilder = {
	build: jest.fn<QueryObject, []>(),
	hydrate: jest.fn<MongoDBQueryBuilder, []>(),
	where: jest.fn<MongoDBQueryBuilder, [string]>(),
	equals: jest.fn<MongoDBQueryBuilder, [any]>()
};
const queryBuilderStatic = {
	create: jest.fn<MongoDBQueryBuilder, []>()
};

type ReturnedList = List<User | Partial<User>>;

const queryService = {
	query: jest.fn<Promise<ReturnedList>, [QueryObject]>()
};
const userRepository = new UserRepositoryImp(persistenceService, queryBuilderStatic, queryService);
const queryObject = {};

let user: User;
let id: UserId;
let returnedUsers: User[];
let returnedUser: User;
let listToReturn: ReturnedList;
describe("UserRepository", () => {
	beforeEach(() => {
		persistenceService.save.mockReset();
		persistenceService.delete.mockReset();
		queryBuilderStatic.create.mockReset();
		queryBuilderStatic.create.mockReturnValue((queryBuilder as unknown) as MongoDBQueryBuilder);
		queryBuilder.build.mockReset();
		queryBuilder.build.mockReturnValue(queryObject);
		queryBuilder.hydrate.mockReset();
		queryBuilder.hydrate.mockReturnThis();
		queryBuilder.where.mockReset();
		queryBuilder.where.mockReturnThis();
		queryBuilder.equals.mockReset();
		queryBuilder.equals.mockReturnThis();
		queryService.query.mockReset();
	});

	it("#save should call persistenceService#save with it's argument", async () => {
		givenUser();
		await whenSaving();
		thenPersistenceServiceSaveHasBeenCalledWithUser();
	});

	function givenUser() {
		user = new User({
			email: "Lonie85@hotmail.com",
			password: "ju0IG90b0h0WQSd"
		});
	}

	async function whenSaving() {
		await userRepository.save(user);
	}

	function thenPersistenceServiceSaveHasBeenCalledWithUser() {
		expect(persistenceService.save).toBeCalledWith(user);
	}

	it("#delete should call persistenceService#delete with it's argument", async () => {
		givenUserId();
		await whenDeleting();
		thenPersistenceServiceDeleteHasBeenCalledWithId();
	});

	function givenUserId(idToCopy?: string) {
		id = new UserId(idToCopy);
	}

	async function whenDeleting() {
		await userRepository.delete(id);
	}

	function thenPersistenceServiceDeleteHasBeenCalledWithId() {
		expect(persistenceService.delete).toBeCalledWith(id);
	}

	it("#findAll should call queryBuilder.create", async () => {
		givenListOfHydratedUsers();
		await whenFindingAllUsers();
		thenQueryBuilderCreateHasBeenCalled();
	});

	function givenListOfHydratedUsers() {
		const user1 = new User({
			email: "Jacey_Kutch@hotmail.com",
			password: "Vzp15LCkJyw7pAU"
		});
		const user2 = new User({
			email: "Sallie28@yahoo.com",
			password: "JRD0wIS7Hc43jrs"
		});
		const user3 = new User({
			email: "Alexandria1@yahoo.com",
			password: "Ej5aWgYjWPhBOao"
		});
		listToReturn = List<User | Partial<User>>([user1, user2, user3]);
		queryService.query.mockResolvedValue(listToReturn);
	}

	async function whenFindingAllUsers() {
		returnedUsers = await userRepository.findAll();
	}

	function thenQueryBuilderCreateHasBeenCalled() {
		expect(queryBuilderStatic.create).toBeCalled();
	}

	it.each<keyof typeof queryBuilder>(["hydrate", "build"])(
		"#findAll should call returned queryBuilder.%s",
		async methodName => {
			givenListOfHydratedUsers();
			await whenFindingAllUsers();
			thenReturnedBuilderHasHaveCalled(methodName);
		}
	);

	function thenReturnedBuilderHasHaveCalled(methodName: keyof typeof queryBuilder) {
		expect(queryBuilder[methodName]).toHaveBeenCalled();
	}

	it(`#findAll should call queryService.query with query returned by queryBuilder
	and return Array matching to List returned by it`, async () => {
		givenListOfHydratedUsers();
		await whenFindingAllUsers();
		thenQueryServiceQueryWasCalledWithReturnedQueryObject();
		thenReturnedArrayMatchesReturnedList();
	});

	function thenQueryServiceQueryWasCalledWithReturnedQueryObject() {
		expect(queryService.query).toHaveBeenCalledWith(queryObject);
	}

	function thenReturnedArrayMatchesReturnedList() {
		returnedUsers.forEach((user, index) => {
			expect(user).toBe(listToReturn.get(index));
		});
	}

	it("#findAll should throw AppLogicError if List returned by queryService has not User item", async () => {
		givenReturnedListWithWrongUser();
		await thenFindAllThrows(AppLogicError);
	});

	function givenReturnedListWithWrongUser() {
		const user1 = new User({
			email: "Jacey_Kutch@hotmail.com",
			password: "Vzp15LCkJyw7pAU"
		});
		const user2 = new User({
			email: "Sallie28@yahoo.com",
			password: "JRD0wIS7Hc43jrs"
		});
		const user3 = {
			email: "Edgar5@yahoo.com"
		};
		listToReturn = List<User | Partial<User>>([user1, user2, user3]);
		queryService.query.mockResolvedValue(listToReturn);
	}

	async function thenFindAllThrows(error: any) {
		await expect(userRepository.findAll()).rejects.toBeInstanceOf(error);
	}

	it.each<[keyof typeof queryBuilder, any]>([
		["build", undefined],
		["hydrate", undefined],
		["where", "_id"],
		["equals", new UserId().toString()]
	])("#findOneById should call returned queryBuilder.%s with %s", async (methodName, value) => {
		givenUserIdDepenidingOfTheMethodAndValue(methodName, value);
		givenSomeUserInReturnedList();
		await whenFindingOneById();
		thenReturnedBuilderHasHaveCalledMethodWith(methodName, value);
	});

	function givenUserIdDepenidingOfTheMethodAndValue(
		methodName: keyof typeof queryBuilder,
		value: any
	) {
		if (methodName == "equals") givenUserId(value);
		else givenUserId();
	}

	function givenSomeUserInReturnedList() {
		const user1 = new User({
			email: "Lonie85@hotmail.com",
			password: "ju0IG90b0h0WQSd"
		});
		queryService.query.mockResolvedValue(
			List<User | Partial<User>>([user1])
		);
	}

	async function whenFindingOneById() {
		returnedUser = await userRepository.findOneById(id);
	}
	function thenReturnedBuilderHasHaveCalledMethodWith(
		methodName: keyof typeof queryBuilder,
		value: any
	) {
		if (value === void 0) expect(queryBuilder[methodName]).toHaveBeenCalled();
		else expect(queryBuilder[methodName]).toHaveBeenCalledWith(value);
	}

	it("#findOneById should return user with matching id if one is present", async () => {
		givenUserIdAndMatchingInDB();
		await whenFindingOneById();
		thenReturnedUserIdMatchesGivenId();
	});

	function givenUserIdAndMatchingInDB() {
		givenUserId();
		const user1 = new User({
			id,
			email: "Casey.Little@yahoo.com",
			password: "eZnq1FMGKwdozTN"
		});
		listToReturn = List<User | Partial<User>>([user1]);
		queryService.query.mockResolvedValueOnce(listToReturn);
	}

	function thenReturnedUserIdMatchesGivenId() {
		expect(returnedUser.id.equals(id)).toBe(true);
	}

	it("#findOneById should throw EmptyQueryError when there is no matching user found", async () => {
		givenUserIdAndNoMatchingInDB();
		await thenFindByIdThrows(EmptyQueryError);
	});

	function givenUserIdAndNoMatchingInDB() {
		givenUserId();
		queryService.query.mockResolvedValueOnce(List());
	}

	async function thenFindByIdThrows(error: any) {
		await expect(userRepository.findOneById(id)).rejects.toBeInstanceOf(error);
	}
});
