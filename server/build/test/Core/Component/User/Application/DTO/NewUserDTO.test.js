"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var NewUserDTO_1 = __importDefault(require("../../../../../../src/Core/Component/User/Aplication/DTO/NewUserDTO"));
describe("NewUserDTO", function () {
    it("should store properly all data", function () {
        expect.assertions(1);
        var validUserWithName = {
            email: "Ms.Jeffrey.Mraz@hotmail.com",
            name: "Jeff",
            password: "LoveDogs1"
        };
        var userDTO = new NewUserDTO_1.default(validUserWithName);
        expect(userDTO).toMatchObject(validUserWithName);
    });
});
