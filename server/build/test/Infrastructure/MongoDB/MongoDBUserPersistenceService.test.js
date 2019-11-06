"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var MongoDBUserPersistenceService_1 = __importDefault(require("../../../src/Infrastructure/MongoDB/MongoDBUserPersistenceService"));
var User_1 = __importDefault(require("../../../src/Core/Component/User/Domain/User/User"));
var User_2 = require("../../../src/Infrastructure/MongoDB/Model/User");
var mongoDBTestHelper_1 = require("./mongoDBTestHelper");
var UserId_1 = __importDefault(require("../../../src/Core/SharedKernel/Component/User/Domain/User/UserId"));
var sampleUsers_1 = require("../../Core/Component/User/Domain/User/sampleUsers");
var service = new MongoDBUserPersistenceService_1.default();
describe("MongoDBUserPersistenceService#save", function () {
    beforeAll(mongoDBTestHelper_1.mongoBeforeAll);
    afterAll(mongoDBTestHelper_1.mongoAfterAll(User_2.UserModel));
    it("should create user and save in db when there is no such in db", function () { return __awaiter(_this, void 0, void 0, function () {
        var user, userFromDBBeforeService, userAfterService, userFromDBAfterService;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect.assertions(4);
                    user = new User_1.default(sampleUsers_1.lauryn);
                    return [4 /*yield*/, User_2.UserModel.findById(user.id.toString())];
                case 1:
                    userFromDBBeforeService = _a.sent();
                    expect(userFromDBBeforeService).toBeFalsy();
                    return [4 /*yield*/, service.save(user)];
                case 2:
                    userAfterService = _a.sent();
                    expect(userAfterService).toMatchObject(user);
                    return [4 /*yield*/, User_2.UserModel.findById(user.id.toString())];
                case 3:
                    userFromDBAfterService = _a.sent();
                    expect(userFromDBAfterService).toBeTruthy();
                    if (userFromDBAfterService)
                        expect(User_2.UserMapper.toDomainObject(userFromDBAfterService)).toMatchObject(user);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should edit user when there he/she is in db", function () { return __awaiter(_this, void 0, void 0, function () {
        var user, email, name, id, userFromDBBeforeService, userAfterService, userFromDBAfterService;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect.assertions(3);
                    user = new User_1.default(sampleUsers_1.dee);
                    return [4 /*yield*/, service.save(user)];
                case 1:
                    _a.sent();
                    email = user.email, name = user.name, id = user.id;
                    user = new User_1.default({ email: email, name: name, id: id, password: "auxiliary.PNG" });
                    return [4 /*yield*/, User_2.UserModel.findById(user.id.toString())];
                case 2:
                    userFromDBBeforeService = _a.sent();
                    expect(userFromDBBeforeService).toBeTruthy();
                    return [4 /*yield*/, service.save(user)];
                case 3:
                    userAfterService = _a.sent();
                    expect(userAfterService).toMatchObject(user);
                    return [4 /*yield*/, User_2.UserModel.findById(user.id.toString())];
                case 4:
                    userFromDBAfterService = _a.sent();
                    if (userFromDBAfterService)
                        expect(userFromDBAfterService.password).toBe(user.password);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should throw an error when new user has same email as any of existing users", function () { return __awaiter(_this, void 0, void 0, function () {
        var existingUser, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    existingUser = new User_1.default(sampleUsers_1.earline);
                    return [4 /*yield*/, service.save(existingUser)];
                case 1:
                    _a.sent();
                    newUser = new User_1.default({ name: "Stanley", email: sampleUsers_1.earline.email, password: "whatever" });
                    return [4 /*yield*/, expect(service.save(newUser)).rejects.toBeTruthy()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("MongoDBUserPersistenceService#delete", function () {
    beforeAll(mongoDBTestHelper_1.mongoBeforeAll);
    afterAll(mongoDBTestHelper_1.mongoAfterAll(User_2.UserModel));
    it("should throw an error when user is missing", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect.assertions(1);
                    return [4 /*yield*/, expect(service.delete(new UserId_1.default())).rejects.toBeTruthy()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should successfully delete user", function () { return __awaiter(_this, void 0, void 0, function () {
        var user, deletedUserQuery;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect.assertions(2);
                    user = new User_1.default(sampleUsers_1.earline);
                    return [4 /*yield*/, service.save(user)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, expect(service.delete(user.id)).resolves.toBeTruthy()];
                case 2:
                    _a.sent();
                    deletedUserQuery = User_2.UserModel.findById(user.id.toString());
                    return [4 /*yield*/, expect(deletedUserQuery).resolves.toBeFalsy()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("MongoDBUserPersistenceService#findById", function () {
    beforeAll(mongoDBTestHelper_1.mongoBeforeAll);
    afterAll(mongoDBTestHelper_1.mongoAfterAll(User_2.UserModel));
    it("should throw an error when user is missing", function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect.assertions(1);
                    return [4 /*yield*/, expect(service.findById(new UserId_1.default())).rejects.toBeTruthy()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return user when there is one in db", function () { return __awaiter(_this, void 0, void 0, function () {
        var user, userFromDb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = new User_1.default(sampleUsers_1.otilia);
                    return [4 /*yield*/, service.save(user)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, service.findById(user.id)];
                case 2:
                    userFromDb = _a.sent();
                    expect(userFromDb).toMatchObject(user);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("MongoDBUserPersistenceService#findAll", function () {
    beforeAll(mongoDBTestHelper_1.mongoBeforeAll);
    afterAll(mongoDBTestHelper_1.mongoAfterAll(User_2.UserModel));
    it("should return empty array when there is no users in db", function () { return __awaiter(_this, void 0, void 0, function () {
        var emptyUserArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect.assertions(2);
                    return [4 /*yield*/, service.findAll()];
                case 1:
                    emptyUserArray = _a.sent();
                    expect(emptyUserArray).toBeInstanceOf(Array);
                    expect(emptyUserArray.length).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return every person in db", function () { return __awaiter(_this, void 0, void 0, function () {
        var userArray, userFromDBArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect.assertions(4);
                    userArray = [new User_1.default(sampleUsers_1.otilia)];
                    return [4 /*yield*/, service.save(userArray[0])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, service.findAll()];
                case 2:
                    userFromDBArray = _a.sent();
                    expect(matchingArraysById(userArray, userFromDBArray)).toBe(true);
                    userArray.push(new User_1.default(sampleUsers_1.earline));
                    return [4 /*yield*/, service.save(userArray[1])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, service.findAll()];
                case 4:
                    userFromDBArray = _a.sent();
                    expect(matchingArraysById(userArray, userFromDBArray)).toBe(true);
                    userArray.push(new User_1.default(sampleUsers_1.lauryn));
                    return [4 /*yield*/, service.save(userArray[2])];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, service.findAll()];
                case 6:
                    userFromDBArray = _a.sent();
                    expect(matchingArraysById(userArray, userFromDBArray)).toBe(true);
                    userArray.push(new User_1.default(sampleUsers_1.dee));
                    return [4 /*yield*/, service.save(userArray[3])];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, service.findAll()];
                case 8:
                    userFromDBArray = _a.sent();
                    expect(matchingArraysById(userArray, userFromDBArray)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
function matchingArraysById(users, uFD) {
    var usersFromDB = uFD.slice();
    return users.every(function (user) {
        var userFromDB = usersFromDB.find(function (userFromDB) { return userFromDB.id.toString() == user.id.toString(); });
        if (!userFromDB)
            return false;
        usersFromDB.splice(usersFromDB.indexOf(userFromDB), 1);
        return true;
    });
}
