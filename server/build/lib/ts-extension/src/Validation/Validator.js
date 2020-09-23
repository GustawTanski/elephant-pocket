"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
var Validator = /** @class */ (function () {
    function Validator(optionMap) {
        var schema = this.translateOptionMapToSchemaMap(optionMap);
        this.schema = joi_1.default.object(schema);
    }
    Validator.prototype.validate = function (value) {
        return this.schema.validate(value);
    };
    Validator.prototype.appendToSchema = function (optionMap) {
        var schema = this.translateOptionMapToSchemaMap(optionMap);
        this.schema = this.schema.append(schema);
    };
    Validator.prototype.translateOptionMapToSchemaMap = function (optionMap) {
        var schemaMap = {};
        for (var item in optionMap) {
            this.translateOptionToSchema(optionMap, schemaMap, item);
        }
        return schemaMap;
    };
    Validator.prototype.translateOptionToSchema = function (optionMap, schema, item) {
        schema[item] = optionMap[item]();
    };
    Validator.email = function () {
        debugger;
        return this.makeValidatable(function () {
            return joi_1.default.string()
                .email()
                .required();
        });
    };
    Validator.string = function () {
        return this.makeValidatable(function () { return joi_1.default.string(); });
    };
    Validator.password = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.min, min = _c === void 0 ? 6 : _c, _d = _b.max, max = _d === void 0 ? 255 : _d, _e = _b.regex, regex = _e === void 0 ? /.+/ : _e, _f = _b.required, required = _f === void 0 ? true : _f;
        var schema = joi_1.default.string()
            .min(min)
            .max(max);
        if (regex instanceof Array) {
            schema = this.addRegexArrayToStringSchema(schema, regex);
        }
        else
            schema = schema.regex(regex);
        if (required)
            schema = this.makeSchemaRequired(schema);
        return this.makeValidatable(function () { return schema; });
    };
    Validator.makeValidatable = function (func) {
        var newFunction = func;
        newFunction.validate = function validate(value) {
            return func().validate(value);
        };
        return newFunction;
    };
    Validator.makeSchemaRequired = function (schema) {
        return schema.required();
    };
    Validator.addRegexArrayToStringSchema = function (schema, regex) {
        return (schema = regex.reduce(function (prev, curr) { return prev.regex(curr); }, schema));
    };
    return Validator;
}());
exports.default = Validator;
