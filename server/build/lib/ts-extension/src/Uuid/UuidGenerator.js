"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var v4_1 = __importDefault(require("uuid/v4"));
var Uuid_1 = __importDefault(require("./Uuid"));
var uuid_validate_1 = __importDefault(require("uuid-validate"));
var UuidGenerator = /** @class */ (function () {
    function UuidGenerator() {
    }
    UuidGenerator.generateAsString = function () {
        return UuidGenerator.defaultGenerator();
    };
    UuidGenerator.generate = function () {
        return new Uuid_1.default(UuidGenerator.generateAsString());
    };
    UuidGenerator.validate = function (uuid) {
        return uuid_validate_1.default(uuid);
    };
    UuidGenerator.defaultGenerator = v4_1.default;
    return UuidGenerator;
}());
exports.default = UuidGenerator;
