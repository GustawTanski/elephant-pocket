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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var InvalidArgumentError_1 = __importDefault(require("../../Core/SharedKernel/Error/InvalidArgumentError"));
var AppRuntimeError_1 = __importDefault(require("../../Core/SharedKernel/Error/AppRuntimeError"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var UserRESTAPI = /** @class */ (function () {
    function UserRESTAPI(applicationService) {
        var _this = this;
        this.router = express_1.Router();
        this.path = "/user";
        this.createUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.newUserTypeCheck(req.body)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.applicationService.createUser(req.body)];
                    case 2:
                        user = _a.sent();
                        token = jsonwebtoken_1.default.sign(user.id, "pieski");
                        return [2 /*return*/, res
                                .status(200)
                                .header({ "x-auth-token": token })
                                .send({ name: user.name, email: user.email })];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1 instanceof AppRuntimeError_1.default || error_1 instanceof InvalidArgumentError_1.default)
                            return [2 /*return*/, res.status(400).send(error_1.message)];
                        else {
                            console.error(error_1);
                            return [2 /*return*/, res.status(500).send("Unexpected error ocurred!")];
                        }
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, res.status(400).send("Some types error in request's body!")];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.applicationService = applicationService;
        this.router.post(this.path, this.createUser);
    }
    UserRESTAPI.prototype.newUserTypeCheck = function (userData) {
        if (userData instanceof Object) {
            var name_1 = userData.name, password = userData.password, email = userData.email, rest = __rest(userData, ["name", "password", "email"]);
            var nameIsStringOrUndefined = name_1 == void 0 || typeof name_1 == "string";
            var passwordIsString = typeof password == "string";
            var emailIsString = typeof email == "string";
            var restIsEmpty = Object.keys(rest).length == 0;
            return nameIsStringOrUndefined && passwordIsString && emailIsString && restIsEmpty;
        }
        else
            return false;
    };
    return UserRESTAPI;
}());
exports.default = UserRESTAPI;
