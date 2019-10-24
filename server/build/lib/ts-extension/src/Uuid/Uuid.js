"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_validate_1 = __importDefault(require("uuid-validate"));
var Uuid = /** @class */ (function () {
    function Uuid(uuid) {
        if (!this.validate(uuid))
            throw new Error("Wrong uuid string provided!");
        this.uuid = uuid;
    }
    Uuid.prototype.toString = function () {
        return this.uuid;
    };
    Uuid.prototype.toJSON = function () {
        return this.uuid;
    };
    Uuid.prototype.validate = function (uuid) {
        return uuid_validate_1.default(uuid);
    };
    return Uuid;
}());
exports.default = Uuid;
