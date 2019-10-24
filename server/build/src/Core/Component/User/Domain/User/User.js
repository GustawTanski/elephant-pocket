"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = __importDefault(require("../../../../../../lib/ts-extension/src/Validation/Validator"));
var UserId_1 = __importDefault(require("../../../../SharedKernel/Component/User/Domain/User/UserId"));
var User = /** @class */ (function () {
    function User(base) {
        var id = this.handleId(base);
        this.validate(__assign({}, base, { id: id }));
        this.email = base.email;
        this.password = base.password;
        this.name = base.name;
        this.id = id;
    }
    User.prototype.handleId = function (base) {
        var id;
        if (base.id instanceof UserId_1.default)
            id = new UserId_1.default(base.id.toString());
        else
            id = new UserId_1.default(base.id);
        return id;
    };
    User.prototype.validate = function (base) {
        var error = Validator_1.default.validateAsClass(base, User).error;
        if (error)
            throw new Error(error.details[0].message);
    };
    __decorate([
        (Validator_1.default.string().optional())
    ], User.prototype, "name", void 0);
    __decorate([
        Validator_1.default.email()
    ], User.prototype, "email", void 0);
    __decorate([
        Validator_1.default.password()
    ], User.prototype, "password", void 0);
    __decorate([
        Validator_1.default.objectRequired()
    ], User.prototype, "id", void 0);
    return User;
}());
exports.default = User;
