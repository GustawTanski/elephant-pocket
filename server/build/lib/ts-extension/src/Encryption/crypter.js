"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var saltRounds = 10;
function encrypt(secret, salt) {
    if (salt === void 0) { salt = saltRounds; }
    return bcrypt_1.default.hash(secret, salt);
}
function compare(secret, hash) {
    return bcrypt_1.default.compare(secret, hash);
}
var crypter = { encrypt: encrypt, compare: compare };
exports.default = crypter;
