"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_validate_1 = __importDefault(require("uuid-validate"));
var UuidGenerator_1 = __importDefault(require("../../src/Uuid/UuidGenerator"));
var Uuid_1 = __importDefault(require("../../src/Uuid/Uuid"));
describe("UuidGenerator", function () {
    it("should generate valid uuid", function () {
        var uuid = UuidGenerator_1.default.generateAsString();
        expect(uuid_validate_1.default(uuid)).toBe(true);
    });
    it("should generate Uuid object", function () {
        expect.assertions(2);
        var uuid = UuidGenerator_1.default.generate();
        expect(uuid).toBeInstanceOf(Uuid_1.default);
        expect(uuid_validate_1.default(uuid.toString())).toBe(true);
    });
    it("should validate correctly", function () {
        expect.assertions(2);
        var uuid = UuidGenerator_1.default.generateAsString();
        expect(UuidGenerator_1.default.validate(uuid)).toBe(true);
        expect(UuidGenerator_1.default.validate("not-uuid")).toBe(false);
    });
});
