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
var UserId_1 = __importDefault(require("../../../../../../src/Core/SharedKernel/Component/User/Domain/User/UserId"));
var User_1 = __importDefault(require("../../../../../../src/Core/Component/User/Domain/User/User"));
var UserDTOMapper_1 = __importDefault(require("../../../../../../src/Core/Component/User/Aplication/DTO/UserDTOMapper"));
var NewUserDTO_1 = __importDefault(require("../../../../../../src/Core/Component/User/Aplication/DTO/NewUserDTO"));
var PersistedUserDTO_1 = __importDefault(require("../../../../../../src/Core/Component/User/Aplication/DTO/PersistedUserDTO"));
describe("UserDTOMapper", function () {
    var userWithoutId = {
        email: "Hulda.Legros@gmail.com",
        password: "Regional-Paradigm-Agent",
        name: "Customer"
    };
    var userWithId = __assign({}, userWithoutId, { id: new UserId_1.default().toString() });
    it("should properly map data from domain user", function () {
        expect.assertions(2);
        var domainUser = new User_1.default(userWithId);
        var newUserDTO = UserDTOMapper_1.default.toNewUserDTO(domainUser);
        var persistedUserDTO = UserDTOMapper_1.default.toPersistedUserDTO(domainUser);
        expect(newUserDTO).toMatchObject(userWithoutId);
        expect(persistedUserDTO).toMatchObject(userWithId);
    });
    it("should properly map from NewUserDTO to User", function () {
        var newUserDTO = new NewUserDTO_1.default(userWithoutId);
        var domainUser = UserDTOMapper_1.default.toDomainObject(newUserDTO);
        expect(domainUser).toMatchObject(newUserDTO);
    });
    it("should properly map from PersistedUserDTO to User", function () {
        expect.assertions(2);
        var persistedUserDTO = new PersistedUserDTO_1.default(userWithId);
        var name = persistedUserDTO.name, password = persistedUserDTO.password, email = persistedUserDTO.email;
        var domainUser = UserDTOMapper_1.default.toDomainObject(persistedUserDTO);
        expect(domainUser).toMatchObject({
            name: name,
            password: password,
            email: email
        });
        expect(domainUser.id.toString()).toBe(persistedUserDTO.id);
    });
});
