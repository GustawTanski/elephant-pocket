"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = __importDefault(require("../../../../../../lib/ts-extension/src/Validation/Validator"));
var InvalidArgumentError_1 = __importDefault(require("../../../../SharedKernel/Error/InvalidArgumentError"));
var UuidGenerator_1 = __importDefault(require("../../../../../../lib/ts-extension/src/Uuid/UuidGenerator"));
var UserValidationService = /** @class */ (function () {
    function UserValidationService() {
    }
    UserValidationService.validateId = function (id) {
        if (!UuidGenerator_1.default.validate(id))
            throw new InvalidArgumentError_1.default("Provided id: " + id + " is not a valid UserId!");
    };
    UserValidationService.validateEmail = function (email) {
        var error = Validator_1.default.email().validate(email).error;
        if (error)
            throw new InvalidArgumentError_1.default(error.details[0].message);
    };
    UserValidationService.validateAll = function (user) {
        UserValidationService.validateParams(user);
        UserValidationService.validateId(user.id);
    };
    UserValidationService.validateParams = function (validatedObject) {
        var error = this.validator.validate(validatedObject).error;
        if (error)
            throw new InvalidArgumentError_1.default(error.details[0].message);
    };
    UserValidationService.validator = new Validator_1.default({
        email: Validator_1.default.email(),
        password: Validator_1.default.password({ regex: [/[a-z]/, /[A-Z]/, /[0-9]/] }),
        name: Validator_1.default.string()
    });
    return UserValidationService;
}());
exports.default = UserValidationService;
