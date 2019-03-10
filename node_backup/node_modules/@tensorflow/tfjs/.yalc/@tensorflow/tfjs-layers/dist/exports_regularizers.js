"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regularizers = require("./regularizers");
var regularizers_1 = require("./regularizers");
function l1l2(config) {
    return new regularizers_1.L1L2(config);
}
exports.l1l2 = l1l2;
function l1(config) {
    return regularizers.l1(config);
}
exports.l1 = l1;
function l2(config) {
    return regularizers.l2(config);
}
exports.l2 = l2;
//# sourceMappingURL=exports_regularizers.js.map