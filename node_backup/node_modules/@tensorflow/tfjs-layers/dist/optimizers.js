"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var common_1 = require("./backend/common");
var errors_1 = require("./errors");
function getOptimizer(identifier) {
    var optimizerMap = {
        'Adagrad': function () { return tfjs_core_1.train.adagrad(0.01); },
        'Adadelta': function () { return tfjs_core_1.train.adadelta(1, 0.95, common_1.epsilon()); },
        'Adam': function () { return tfjs_core_1.train.adam(0.001, 0.9, 0.999, common_1.epsilon()); },
        'Adamax': function () { return tfjs_core_1.train.adamax(0.002, 0.9, 0.999, common_1.epsilon(), 0); },
        'RMSProp': function () { return tfjs_core_1.train.rmsprop(0.001, 0.9, 0, common_1.epsilon()); },
        'SGD': function () { return tfjs_core_1.train.sgd(0.01); }
    };
    optimizerMap['adagrad'] = optimizerMap['Adagrad'];
    optimizerMap['adadelta'] = optimizerMap['Adadelta'];
    optimizerMap['adam'] = optimizerMap['Adam'];
    optimizerMap['adamax'] = optimizerMap['Adamax'];
    optimizerMap['rmsprop'] = optimizerMap['RMSProp'];
    optimizerMap['sgd'] = optimizerMap['SGD'];
    if (identifier in optimizerMap) {
        return optimizerMap[identifier]();
    }
    throw new errors_1.ValueError("Unknown Optimizer " + identifier);
}
exports.getOptimizer = getOptimizer;
//# sourceMappingURL=optimizers.js.map