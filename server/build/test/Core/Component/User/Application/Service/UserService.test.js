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
var UserService_1 = __importDefault(require("../../../../../../src/Core/Component/User/Aplication/Service/UserService"));
var MockedUserRepository_1 = __importDefault(require("./MockedUserRepository"));
var NewUserDTO_1 = __importDefault(require("../../../../../../src/Core/Component/User/Aplication/DTO/NewUserDTO"));
var UserValidationService_1 = __importDefault(require("../../../../../../src/Core/Component/User/Aplication/Validation/UserValidationService"));
var AppRuntimeError_1 = __importDefault(require("../../../../../../src/Core/SharedKernel/Error/AppRuntimeError"));
var UserId_1 = __importDefault(require("../../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId"));
var crypter_1 = __importDefault(require("../../../../../../lib/ts-extension/src/Encryption/crypter"));
var mockedRepo = new MockedUserRepository_1.default();
var userService = new UserService_1.default(mockedRepo, crypter_1.default);
// TODO Password encryption tests
describe("UserService", function () {
    describe("#createUser", function () {
        it("should call ValidationService#validateParams and Repository#save when data is correct", function () { return __awaiter(_this, void 0, void 0, function () {
            var validateParams, save;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect.assertions(2);
                        validateParams = spyOn(UserValidationService_1.default, "validateParams");
                        save = spyOn(mockedRepo, "save");
                        return [4 /*yield*/, userService.createUser({ email: "correct-user@gmail.com", password: "Correct123" })];
                    case 1:
                        _a.sent();
                        expect(validateParams).toBeCalled();
                        expect(save).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should throw AppRuntimeError when provided email is occupied", function () { return __awaiter(_this, void 0, void 0, function () {
            var newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newUser = new NewUserDTO_1.default({ email: "newUser@gmail.com", password: "Correct123" });
                        return [4 /*yield*/, userService.createUser(newUser)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(userService.createUser(newUser)).rejects.toBeInstanceOf(AppRuntimeError_1.default)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("#deleteUser", function () {
        it("should call ValidationService#validateId and Repository#delete when there is user with provided id", function () { return __awaiter(_this, void 0, void 0, function () {
            var newUser, user, deleteUser, validateId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expect.assertions(2);
                        newUser = new NewUserDTO_1.default({
                            email: "Jennings.Halvorson@gmail.com",
                            password: "Dogs123"
                        });
                        return [4 /*yield*/, userService.createUser(newUser)];
                    case 1:
                        user = _a.sent();
                        deleteUser = spyOn(mockedRepo, "delete");
                        validateId = spyOn(UserValidationService_1.default, "validateId");
                        return [4 /*yield*/, userService.deleteUser(user.id)];
                    case 2:
                        _a.sent();
                        expect(deleteUser).toBeCalled();
                        expect(validateId).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should throw AppRuntimeError if there is no user with provided id", function () { return __awaiter(_this, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = new UserId_1.default().toString();
                        return [4 /*yield*/, expect(userService.deleteUser(userId)).rejects.toBeInstanceOf(AppRuntimeError_1.default)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
