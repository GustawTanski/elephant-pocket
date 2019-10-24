"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractId = /** @class */ (function () {
    function AbstractId(id) {
        this._id = id;
    }
    AbstractId.prototype.validate = function (id) {
        if (!this.isValid(id))
            throw Error("Invalid id!");
    };
    return AbstractId;
}());
exports.default = AbstractId;
