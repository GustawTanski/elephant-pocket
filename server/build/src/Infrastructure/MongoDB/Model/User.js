"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var User_1 = __importDefault(require("../../../Core/Component/User/Domain/User/User"));
var UuidGenerator_1 = __importDefault(require("../../../../lib/ts-extension/src/Uuid/UuidGenerator"));
exports.UserSchema = new mongoose_1.Schema({
    // TODO email validating
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    _id: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: UuidGenerator_1.default.validate
        }
    }
});
exports.UserModel = mongoose_1.model("User", exports.UserSchema);
exports.UserMapper = {
    toDocumentProperties: function (user) {
        return {
            name: user.name,
            _id: user.id.toString(),
            email: user.email,
            password: user.password
        };
    },
    toDomainObject: function (user) {
        return new User_1.default({
            name: user.name,
            id: user._id,
            email: user.email,
            password: user.password
        });
    }
};
