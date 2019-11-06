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
var CustomError_1 = __importDefault(require("../../src/Error/CustomError"));
var TestError = /** @class */ (function (_super) {
    __extends(TestError, _super);
    function TestError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TestError;
}(CustomError_1.default));
describe("CustomError", function () {
    it("should work well with instanceof type guard", function () {
        expect.assertions(4);
        try {
            throw new TestError();
        }
        catch (error) {
            expect(error instanceof TestError).toBe(true);
            expect(error instanceof CustomError_1.default).toBe(true);
            expect(error instanceof Error).toBe(true);
            expect(error).toBeInstanceOf(TestError);
        }
    });
    it("should have proper name property", function () {
        try {
            throw new TestError();
        }
        catch (error) {
            expect(error.name).toBe(TestError.name);
        }
    });
    it("should properly store a message", function () {
        var message = "Example message!";
        try {
            throw new TestError(message);
        }
        catch (error) {
            expect(error.message).toBe(message);
        }
    });
});
