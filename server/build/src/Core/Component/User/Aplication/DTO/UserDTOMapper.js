"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var NewUserDTO_1 = __importDefault(require("./NewUserDTO"));
var PersistedUserDTO_1 = __importDefault(require("./PersistedUserDTO"));
var User_1 = __importDefault(require("../../Domain/User/User"));
function toDomainObject(DTO) {
    return new User_1.default(DTO);
}
function toNewUserDTO(user) {
    return new NewUserDTO_1.default(user);
}
function toPersistedUserDTO(_a) {
    var name = _a.name, password = _a.password, email = _a.email, id = _a.id;
    return new PersistedUserDTO_1.default({ name: name, password: password, email: email, id: id.toString() });
}
exports.default = {
    toDomainObject: toDomainObject,
    toNewUserDTO: toNewUserDTO,
    toPersistedUserDTO: toPersistedUserDTO
};
