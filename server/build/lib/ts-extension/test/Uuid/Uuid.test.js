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
});
