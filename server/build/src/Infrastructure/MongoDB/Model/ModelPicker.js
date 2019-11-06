"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("./User");
function modelPicker(entityName) {
    if (entityName in modelMap)
        return modelMap[entityName];
    else
        return null;
}
exports.default = modelPicker;
var modelMap = {
    User: User_1.UserModel
};
