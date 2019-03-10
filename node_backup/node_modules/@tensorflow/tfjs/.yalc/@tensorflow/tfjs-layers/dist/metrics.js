"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tfc = require("@tensorflow/tfjs-core");
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var state_1 = require("./backend/state");
var K = require("./backend/tfjs_backend");
var errors_1 = require("./errors");
var losses_1 = require("./losses");
var losses_2 = require("./losses");
function binaryAccuracy(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var threshold = tfc.mul(state_1.getScalar(0.5), tfc.onesLike(yPred));
        var yPredThresholded = K.cast(tfc.greater(yPred, threshold), yTrue.dtype);
        return tfc.mean(tfc.equal(yTrue, yPredThresholded), -1);
    });
}
exports.binaryAccuracy = binaryAccuracy;
function categoricalAccuracy(yTrue, yPred) {
    return tfjs_core_1.tidy(function () { return K.cast(tfc.equal(tfc.argMax(yTrue, -1), tfc.argMax(yPred, -1)), 'float32'); });
}
exports.categoricalAccuracy = categoricalAccuracy;
function truePositives(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var one = state_1.getScalar(1);
        return tfc.logicalAnd(yTrue.equal(one), yPred.equal(one))
            .sum()
            .cast('float32');
    });
}
function falseNegatives(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var one = state_1.getScalar(1);
        var zero = state_1.getScalar(0);
        return tfc.logicalAnd(yTrue.equal(one), yPred.equal(zero))
            .sum()
            .cast('float32');
    });
}
function falsePositives(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var one = state_1.getScalar(1);
        var zero = state_1.getScalar(0);
        return tfc.logicalAnd(yTrue.equal(zero), yPred.equal(one))
            .sum()
            .cast('float32');
    });
}
function precision(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var zero = state_1.getScalar(0);
        var tp = truePositives(yTrue, yPred);
        var fp = falsePositives(yTrue, yPred);
        var denominator = tp.add(fp);
        return tfc.where(tfc.greater(denominator, zero), tp.div(denominator), zero)
            .cast('float32');
    });
}
exports.precision = precision;
function recall(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var zero = state_1.getScalar(0);
        var tp = truePositives(yTrue, yPred);
        var fn = falseNegatives(yTrue, yPred);
        var denominator = tp.add(fn);
        return tfc.where(tfc.greater(denominator, zero), tp.div(denominator), zero)
            .cast('float32');
    });
}
exports.recall = recall;
function binaryCrossentropy(yTrue, yPred) {
    return losses_2.binaryCrossentropy(yTrue, yPred);
}
exports.binaryCrossentropy = binaryCrossentropy;
function sparseCategoricalAccuracy(yTrue, yPred) {
    throw new errors_1.NotImplementedError();
}
exports.sparseCategoricalAccuracy = sparseCategoricalAccuracy;
function topKCategoricalAccuracy(yTrue, yPred) {
    throw new errors_1.NotImplementedError();
}
exports.topKCategoricalAccuracy = topKCategoricalAccuracy;
function sparseTopKCategoricalAccuracy(yTrue, yPred) {
    throw new errors_1.NotImplementedError();
}
exports.sparseTopKCategoricalAccuracy = sparseTopKCategoricalAccuracy;
exports.mse = losses_1.meanSquaredError;
exports.MSE = losses_1.meanSquaredError;
exports.mae = losses_1.meanAbsoluteError;
exports.MAE = losses_1.meanAbsoluteError;
exports.mape = losses_1.meanAbsolutePercentageError;
exports.MAPE = losses_1.meanAbsolutePercentageError;
exports.categoricalCrossentropy = losses_1.categoricalCrossentropy;
exports.cosine = losses_1.cosineProximity;
exports.sparseCategoricalCrossentropy = losses_1.sparseCategoricalCrossentropy;
function get(identifier) {
    var metricsMap = {
        binaryAccuracy: binaryAccuracy,
        categoricalAccuracy: categoricalAccuracy,
        precision: precision,
        categoricalCrossentropy: exports.categoricalCrossentropy,
        sparseCategoricalCrossentropy: exports.sparseCategoricalCrossentropy,
        mse: exports.mse,
        MSE: exports.MSE,
        mae: exports.mae,
        MAE: exports.MAE,
        mape: exports.mape,
        MAPE: exports.MAPE,
        cosine: exports.cosine,
    };
    if (typeof identifier === 'string' && identifier in metricsMap) {
        return metricsMap[identifier];
    }
    else if (typeof identifier !== 'string' && identifier != null) {
        return identifier;
    }
    else {
        throw new errors_1.ValueError("Unknown metric " + identifier);
    }
}
exports.get = get;
//# sourceMappingURL=metrics.js.map