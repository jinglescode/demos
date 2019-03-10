"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function countParamsInWeights(weights) {
    var count = 0;
    for (var _i = 0, weights_1 = weights; _i < weights_1.length; _i++) {
        var weight = weights_1[_i];
        if (weight.shape.length === 0) {
            count += 1;
        }
        else {
            count += weight.shape.reduce(function (a, b) { return a * b; });
        }
    }
    return count;
}
exports.countParamsInWeights = countParamsInWeights;
//# sourceMappingURL=variable_utils.js.map