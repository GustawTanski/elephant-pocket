"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractId_1 = __importDefault(require("./AbstractId"));
var UuidGenerator_1 = __importDefault(require("../Uuid/UuidGenerator"));
var Uuid_1 = __importDefault(require("../Uuid/Uuid"));
var AbstractUuidId = /** @class */ (function (_super) {
    __extends(AbstractUuidId, _super);
    function AbstractUuidId(id) {
        var _this = this;
        if (id instanceof Uuid_1.default)
            _this = _super.call(this, id) || this;
        else if (!(typeof id == "undefined"))
            _this = _super.call(this, new Uuid_1.default(id)) || this;
        else
            _this = _super.call(this, UuidGenerator_1.default.generate()) || this;
        return _this;
    }
    AbstractUuidId.prototype.toString = function () {
        return this._id.toString();
    };
    AbstractUuidId.prototype.isValid = function () {
        return true;
    };
    return AbstractUuidId;
}(AbstractId_1.default));
exports.default = AbstractUuidId;
