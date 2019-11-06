"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../../../../../../src/Core/Component/User/Domain/User/User"));
var UserId_1 = __importDefault(require("../../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId"));
var UuidGenerator_1 = __importDefault(require("../../../../../../lib/ts-extension/src/Uuid/UuidGenerator"));
describe("User entity", function () {
    var userWithName = {
        email: "Josiane.Schneider@gmail.com",
        password: "primaryCircuit",
        name: "Otilia"
    };
    it("should create proper object with email and password only", function () {
        expect.assertions(2);
        var properUser = { email: "Laverna.VonRueden@gmail.com", password: "synthesizing" };
        var user = new User_1.default(properUser);
        expect(user).toBeInstanceOf(User_1.default);
        expect(user).toMatchObject(properUser);
    });
    it("should accept any string as name", function () {
        expect.assertions(2);
        var user = new User_1.default(userWithName);
        expect(user).toBeInstanceOf(User_1.default);
        expect(user).toMatchObject(userWithName);
    });
    it("should make exact copies", function () {
        expect.assertions(3);
        var otilia = new User_1.default(userWithName);
        var schneider = new User_1.default(otilia);
        expect(otilia).toMatchObject(userWithName);
        expect(schneider).toMatchObject(userWithName);
        expect(otilia).not.toBe(schneider);
    });
    it("should create valid UserId when nothing is provided", function () {
        var user = new User_1.default(userWithName);
        expect(user.id).toBeInstanceOf(UserId_1.default);
    });
    it("should create valid UserId when string uuid is provided", function () {
        var uuid = UuidGenerator_1.default.generateAsString();
        var user = new User_1.default(__assign({}, userWithName, { id: uuid }));
        expect(user.id).toBeInstanceOf(UserId_1.default);
        expect(user.id.toString()).toBe(uuid);
    });
    it("should copy provided UserId", function () {
        var userId = new UserId_1.default();
        var user = new User_1.default(__assign({}, userWithName, { id: userId }));
        var secondUser = new User_1.default(user);
        expect(user.id.toString()).toBe(userId.toString());
        expect(user.id).not.toBe(userId);
        expect(user.id.toString()).toBe(secondUser.id.toString());
        expect(user.id).not.toBe(secondUser.id);
    });
    it("should throw an error when wrong uuid string provided", function () {
        expect(function () { return new User_1.default(__assign({}, userWithName, { id: "not-uuid" })); }).toThrowError();
    });
});
