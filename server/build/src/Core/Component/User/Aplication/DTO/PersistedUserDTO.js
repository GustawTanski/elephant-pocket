"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedUserDTO = /** @class */ (function () {
    function PersistedUserDTO(base) {
        this.email = base.email;
        this.password = base.password;
        this.name = base.name;
        this.id = base.id;
    }
    return PersistedUserDTO;
}());
exports.default = PersistedUserDTO;
