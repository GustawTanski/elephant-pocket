"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedUserDTO_1 = __importDefault(require("../../../../../../src/Core/Component/User/Aplication/DTO/PersistedUserDTO"));
var UuidGenerator_1 = __importDefault(require("../../../../../../lib/ts-extension/src/Uuid/UuidGenerator"));
describe("PersistedUserDTO", function () {
    it("should store properly all data", function () {
        expect.assertions(1);
        var validUserWithName = {
            email: "Ms.Jeffrey.Mraz@hotmail.com",
            name: "Jeff",
            password: "LoveDogs1",
            id: UuidGenerator_1.default.generateAsString()
        };
        var userDTO = new PersistedUserDTO_1.default(validUserWithName);
        expect(userDTO).toMatchObject(validUserWithName);
    });
});
