"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserId_1 = __importDefault(require("../../../../SharedKernel/Component/User/Domain/User/UserId"));
var User = /** @class */ (function () {
    function User(base) {
        var id = this.handleIdType(base.id);
        this._email = base.email;
        this._password = base.password;
        this._name = base.name;
        this._id = id;
    }
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        get: function () {
            return this._password;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.handleIdType = function (id) {
        if (id instanceof UserId_1.default)
            return new UserId_1.default(id.toString());
        else
            return new UserId_1.default(id);
    };
    return User;
}());
exports.default = User;
