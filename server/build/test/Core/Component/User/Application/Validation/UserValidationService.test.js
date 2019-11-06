"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserValidationService_1 = __importDefault(require("../../../../../../src/Core/Component/User/Aplication/Validation/UserValidationService"));
var InvalidArgumentError_1 = __importDefault(require("../../../../../../src/Core/SharedKernel/Error/InvalidArgumentError"));
var UserId_1 = __importDefault(require("../../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId"));
describe("UserValidationService", function () {
    it("should throw InvalidArgumentError when wrong id is provided", function () {
        expect(function () { return UserValidationService_1.default.validateId("not-valid-id"); }).toThrow(InvalidArgumentError_1.default);
    });
    it("should throw InvalidArgumentError when wrong email is provided", function () {
        expect(function () { return UserValidationService_1.default.validateEmail("not-valid-email"); }).toThrow(InvalidArgumentError_1.default);
    });
    it("should throw InvalidArgumentError when wrong email or password provided", function () {
        expect.assertions(2);
        var userWithWrongEmail = {
            email: "notvalid",
            password: "AbsolutelyValid123"
        };
        var userWithWrongPassword = {
            email: "valid@gmail.com",
            password: "invalid"
        };
        expect(function () { return UserValidationService_1.default.validateParams(userWithWrongEmail); }).toThrow(InvalidArgumentError_1.default);
        expect(function () { return UserValidationService_1.default.validateParams(userWithWrongPassword); }).toThrow(InvalidArgumentError_1.default);
    });
    it("should call .validateParams and .validateId when called .validateAll", function () {
        expect.assertions(2);
        var validateIdSpy = spyOn(UserValidationService_1.default, "validateId");
        var validateParamsSpy = spyOn(UserValidationService_1.default, "validateParams");
        UserValidationService_1.default.validateAll({
            email: "Shea.Rice@gmail.com",
            password: "Tactics123",
            id: new UserId_1.default().toString()
        });
        expect(validateIdSpy).toBeCalled();
        expect(validateParamsSpy).toBeCalled();
    });
});
