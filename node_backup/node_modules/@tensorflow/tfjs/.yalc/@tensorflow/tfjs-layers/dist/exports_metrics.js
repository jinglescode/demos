"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var losses = require("./losses");
var metrics = require("./metrics");
function binaryAccuracy(yTrue, yPred) {
    return metrics.binaryAccuracy(yTrue, yPred);
}
exports.binaryAccuracy = binaryAccuracy;
function binaryCrossentropy(yTrue, yPred) {
    return metrics.binaryCrossentropy(yTrue, yPred);
}
exports.binaryCrossentropy = binaryCrossentropy;
function categoricalAccuracy(yTrue, yPred) {
    return metrics.categoricalAccuracy(yTrue, yPred);
}
exports.categoricalAccuracy = categoricalAccuracy;
function categoricalCrossentropy(yTrue, yPred) {
    return metrics.categoricalCrossentropy(yTrue, yPred);
}
exports.categoricalCrossentropy = categoricalCrossentropy;
function precision(yTrue, yPred) {
    return metrics.precision(yTrue, yPred);
}
exports.precision = precision;
function recall(yTrue, yPred) {
    return metrics.recall(yTrue, yPred);
}
exports.recall = recall;
function cosineProximity(yTrue, yPred) {
    return losses.cosineProximity(yTrue, yPred);
}
exports.cosineProximity = cosineProximity;
function meanAbsoluteError(yTrue, yPred) {
    return losses.meanAbsoluteError(yTrue, yPred);
}
exports.meanAbsoluteError = meanAbsoluteError;
function meanAbsolutePercentageError(yTrue, yPred) {
    return losses.meanAbsolutePercentageError(yTrue, yPred);
}
exports.meanAbsolutePercentageError = meanAbsolutePercentageError;
function MAPE(yTrue, yPred) {
    return losses.meanAbsolutePercentageError(yTrue, yPred);
}
exports.MAPE = MAPE;
function mape(yTrue, yPred) {
    return losses.meanAbsolutePercentageError(yTrue, yPred);
}
exports.mape = mape;
function meanSquaredError(yTrue, yPred) {
    return losses.meanSquaredError(yTrue, yPred);
}
exports.meanSquaredError = meanSquaredError;
function MSE(yTrue, yPred) {
    return losses.meanSquaredError(yTrue, yPred);
}
exports.MSE = MSE;
function mse(yTrue, yPred) {
    return losses.meanSquaredError(yTrue, yPred);
}
exports.mse = mse;
//# sourceMappingURL=exports_metrics.js.map