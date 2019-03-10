"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initializers_1 = require("./initializers");
function zeros() {
    return new initializers_1.Zeros();
}
exports.zeros = zeros;
function ones() {
    return new initializers_1.Ones();
}
exports.ones = ones;
function constant(config) {
    return new initializers_1.Constant(config);
}
exports.constant = constant;
function randomUniform(config) {
    return new initializers_1.RandomUniform(config);
}
exports.randomUniform = randomUniform;
function randomNormal(config) {
    return new initializers_1.RandomNormal(config);
}
exports.randomNormal = randomNormal;
function truncatedNormal(config) {
    return new initializers_1.TruncatedNormal(config);
}
exports.truncatedNormal = truncatedNormal;
function identity(config) {
    return new initializers_1.Identity(config);
}
exports.identity = identity;
function varianceScaling(config) {
    return new initializers_1.VarianceScaling(config);
}
exports.varianceScaling = varianceScaling;
function glorotUniform(config) {
    return new initializers_1.GlorotUniform(config);
}
exports.glorotUniform = glorotUniform;
function glorotNormal(config) {
    return new initializers_1.GlorotNormal(config);
}
exports.glorotNormal = glorotNormal;
function heNormal(config) {
    return new initializers_1.HeNormal(config);
}
exports.heNormal = heNormal;
function leCunNormal(config) {
    return new initializers_1.LeCunNormal(config);
}
exports.leCunNormal = leCunNormal;
function orthogonal(config) {
    return new initializers_1.Orthogonal(config);
}
exports.orthogonal = orthogonal;
//# sourceMappingURL=exports_initializers.js.map