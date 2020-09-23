"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractUuidId_1 = __importDefault(require("../../src/Identity/AbstractUuidId"));
var UuidGenerator_1 = __importDefault(require("../../src/Uuid/UuidGenerator"));
var uuid_validate_1 = __importDefault(require("uuid-validate"));
var TestUserId = /** @class */ (function (_super) {
    __extends(TestUserId, _super);
    function TestUserId() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TestUserId;
}(AbstractUuidId_1.default));
describe("AbstractUuidId descendant", function () {
    it("should store valid uuid where no argument is provided to constructor", function () {
        var userId = new TestUserId();
        expect(uuid_validate_1.default(userId.toString())).toBe(true);
    });
    it("should create proper uuid when string is provided", function () {
        var uuid = UuidGenerator_1.default.generateAsString();
        var userId = new TestUserId(uuid);
        expect(uuid_validate_1.default(userId.toString())).toBe(true);
    });
    it("should throw when provided uuid string is invalid", function () {
        var uuid = "not-uuid";
        expect(function () { return new TestUserId(uuid); }).toThrowError();
        expect(function () { return new TestUserId(""); }).toThrowError();
    });
    it("should accept Uuid object", function () {
        var userId = new TestUserId(UuidGenerator_1.default.generate());
        expect(uuid_validate_1.default(userId.toString())).toBe(true);
    });
    it("should compare in correct way", function () {
        expect.assertions(2);
        var userId1 = new TestUserId();
        var userId1Prim = new TestUserId(userId1.toString());
        var userId2 = new TestUserId();
        expect(userId1.equals(userId1Prim)).toBe(true);
        expect(userId1.equals(userId2)).toBe(false);
    });
});
