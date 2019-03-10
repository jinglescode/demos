"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constraints_1 = require("./constraints");
function maxNorm(config) {
    return new constraints_1.MaxNorm(config);
}
exports.maxNorm = maxNorm;
function unitNorm(config) {
    return new constraints_1.UnitNorm(config);
}
exports.unitNorm = unitNorm;
function nonNeg() {
    return new constraints_1.NonNeg();
}
exports.nonNeg = nonNeg;
function minMaxNorm(config) {
    return new constraints_1.MinMaxNorm(config);
}
exports.minMaxNorm = minMaxNorm;
//# sourceMappingURL=exports_constraints.js.map