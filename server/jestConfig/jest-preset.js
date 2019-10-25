const merge = require("merge");
const ts_preset = require("ts-jest/jest-preset");
const mongodb_preset = require("@shelf/jest-mongodb/jest-preset");

module.exports = merge.recursive(mongodb_preset, ts_preset);
