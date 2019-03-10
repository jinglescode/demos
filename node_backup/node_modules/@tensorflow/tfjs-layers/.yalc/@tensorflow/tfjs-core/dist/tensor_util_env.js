"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("./environment");
var tensor_1 = require("./tensor");
var util_1 = require("./util");
function convertToTensor(x, argName, functionName, dtype) {
    if (dtype === void 0) { dtype = 'float32'; }
    dtype = dtype || 'float32';
    if (x instanceof tensor_1.Tensor) {
        return x;
    }
    if (!util_1.isTypedArray(x) && !Array.isArray(x) && typeof x !== 'number' &&
        typeof x !== 'boolean') {
        throw new Error("Argument '" + argName + "' passed to '" + functionName + "' must be a " +
            ("Tensor or TensorLike, but got " + x.constructor.name));
    }
    var inferredShape = util_1.inferShape(x);
    if (!util_1.isTypedArray(x) && !Array.isArray(x)) {
        x = [x];
    }
    return tensor_1.Tensor.make(inferredShape, { values: util_1.toTypedArray(x, dtype, environment_1.ENV.get('DEBUG')) }, dtype);
}
exports.convertToTensor = convertToTensor;
function convertToTensorArray(arg, argName, functionName) {
    if (!Array.isArray(arg)) {
        throw new Error("Argument " + argName + " passed to " + functionName + " must be a " +
            '`Tensor[]` or `TensorLike[]`');
    }
    var tensors = arg;
    return tensors.map(function (t, i) { return convertToTensor(t, argName + "[" + i + "]", functionName); });
}
exports.convertToTensorArray = convertToTensorArray;
//# sourceMappingURL=tensor_util_env.js.map