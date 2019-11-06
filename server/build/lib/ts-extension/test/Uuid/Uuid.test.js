"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Uuid_1 = __importDefault(require("../../src/Uuid/Uuid"));
var v4_1 = __importDefault(require("uuid/v4"));
describe("Uuid", function () {
    it("should accept correct uuid and store it", function () {
        var sampleUuid = v4_1.default();
        var uuid = new Uuid_1.default(sampleUuid);
        expect(uuid.toString()).toBe(sampleUuid);
    });
    it("should throw an error, when uuid is not correct", function () {
        var notUuid = "notUuid";
        expect(function () { return new Uuid_1.default(notUuid); }).toThrowError();
    });
    it("should compare in correct way", function () {
        expect.assertions(2);
        var sampleUuid1 = v4_1.default();
        var sampleUuid2 = v4_1.default();
        var uuid1 = new Uuid_1.default(sampleUuid1);
        var uuid1Prim = new Uuid_1.default(sampleUuid1);
        var uuid2 = new Uuid_1.default(sampleUuid2);
        expect(uuid1.equals(uuid1Prim)).toBe(true);
        expect(uuid1.equals(uuid2)).toBe(false);
    });
});
