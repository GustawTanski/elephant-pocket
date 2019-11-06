"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewUserDTO = /** @class */ (function () {
    function NewUserDTO(base) {
        this.email = base.email;
        this.name = base.name;
        this.password = base.password;
    }
    return NewUserDTO;
}());
exports.default = NewUserDTO;
