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
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../../Core/Component/User/Domain/User/User"));
var User_2 = require("./Model/User");
var EmptyQueryError_1 = __importDefault(require("../../Core/Port/Persistence/Error/EmptyQueryError"));
var AppRuntimeError_1 = __importDefault(require("../../Core/SharedKernel/Error/AppRuntimeError"));
// implements IPersistanceServicePort<User>
var MongoDBUserPersistanceService = /** @class */ (function () {
    function MongoDBUserPersistanceService() {
        this.UserModel = User_2.UserModel;
    }
    MongoDBUserPersistanceService.prototype.add = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var persistedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        persistedUser = new this.UserModel(User_2.UserMapper.toDocumentProperties(user));
                        return [4 /*yield*/, persistedUser.save()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoDBUserPersistanceService.prototype.save = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var persistedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.UserModel.findById(user.id.toString())];
                    case 1:
                        persistedUser = _a.sent();
                        if (!!persistedUser) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.add(user)];
                    case 2:
                        persistedUser = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        persistedUser.overwrite(User_2.UserMapper.toDocumentProperties(user));
                        return [4 /*yield*/, persistedUser.save()];
                    case 4:
                        persistedUser = _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, User_2.UserMapper.toDomainObject(persistedUser)];
                }
            });
        });
    };
    MongoDBUserPersistanceService.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.UserModel.findByIdAndDelete(id.toString())];
                    case 1:
                        deletedUser = _a.sent();
                        if (!deletedUser)
                            throw new AppRuntimeError_1.default("There is no user witch such id!");
                        else
                            return [2 /*return*/, User_2.UserMapper.toDomainObject(deletedUser)];
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoDBUserPersistanceService.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var persistedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.UserModel.findById(id.toString())];
                    case 1:
                        persistedUser = _a.sent();
                        if (!persistedUser)
                            throw this.notFoundError("id");
                        else
                            return [2 /*return*/, User_2.UserMapper.toDomainObject(persistedUser)];
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoDBUserPersistanceService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var persistedUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.UserModel.find()];
                    case 1:
                        persistedUsers = _a.sent();
                        return [2 /*return*/, persistedUsers.map(function (user) { return User_2.UserMapper.toDomainObject(user); })];
                }
            });
        });
    };
    MongoDBUserPersistanceService.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var persistedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.UserModel.findOne({ email: email })];
                    case 1:
                        persistedUser = _a.sent();
                        if (!persistedUser)
                            throw this.notFoundError("email");
                        return [2 /*return*/, User_2.UserMapper.toDomainObject(persistedUser)];
                }
            });
        });
    };
    MongoDBUserPersistanceService.prototype.findOne = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // TODO
                return [2 /*return*/, new User_1.default({ email: "mocked.user@gmail.com", password: "pasWord123~" })];
            });
        });
    };
    MongoDBUserPersistanceService.prototype.notFoundError = function (parameter) {
        return new EmptyQueryError_1.default("There is no user with such " + parameter + "!");
    };
    return MongoDBUserPersistanceService;
}());
exports.default = MongoDBUserPersistanceService;
