"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jf = __importStar(require("joiful"));
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.validateAsClass = jf.validateAsClass;
    Validator.string = function () { return jf.string(); };
    Validator.objectOptional = function () { return jf.object().optional(); };
    Validator.objectRequired = function () { return jf.object().required(); };
    // TODO better password validation
    Validator.password = function () {
        return jf
            .string()
            .min(6)
            .required();
    };
    Validator.email = function () {
        return jf
            .string()
            .email()
            .required();
    };
    return Validator;
}());
exports.default = Validator;
