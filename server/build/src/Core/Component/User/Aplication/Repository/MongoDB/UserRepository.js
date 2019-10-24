"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRepository = /** @class */ (function () {
    function UserRepository(persistanceService) {
        this.persistanceService = persistanceService;
    }
    UserRepository.prototype.save = function (user) {
        return this.persistanceService.save(user);
    };
    UserRepository.prototype.delete = function (id) {
        return this.persistanceService.delete(id);
    };
    UserRepository.prototype.findOneById = function (id) {
        return this.persistanceService.findById(id);
    };
    UserRepository.prototype.findAll = function () {
        return this.persistanceService.findAll();
    };
    return UserRepository;
}());
exports.default = UserRepository;
