"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tfc = require("@tensorflow/tfjs-core");
var utils_1 = require("./utils");
exports.executeOp = function (node, tensorMap, context) {
    switch (node.op) {
        case 'topK': {
            var x = utils_1.getParamValue('x', node, tensorMap, context);
            var k = utils_1.getParamValue('k', node, tensorMap, context);
            var sorted = utils_1.getParamValue('sorted', node, tensorMap, context);
            var result = tfc.topk(x, k, sorted);
            return [result.values, result.indices];
        }
        default:
            throw TypeError("Node type " + node.op + " is not implemented");
    }
};
exports.CATEGORY = 'evaluation';
//# sourceMappingURL=evaluation_executor.js.map