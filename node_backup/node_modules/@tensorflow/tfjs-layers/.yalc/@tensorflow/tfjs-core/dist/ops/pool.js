"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../environment");
var tensor_util_env_1 = require("../tensor_util_env");
var util = require("../util");
var conv_util = require("./conv_util");
var operation_1 = require("./operation");
function maxPool_(x, filterSize, strides, pad, dimRoundingMode) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'maxPool');
    var x4D = $x;
    var reshapedTo4D = false;
    if ($x.rank === 3) {
        reshapedTo4D = true;
        x4D = $x.as4D(1, $x.shape[0], $x.shape[1], $x.shape[2]);
    }
    util.assert(x4D.rank === 4, "Error in maxPool: input must be rank 4 but got rank " + x4D.rank + ".");
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), "Error in maxPool: pad must be an integer when using, " +
            ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."));
    }
    var convInfo = conv_util.computePool2DInfo(x4D.shape, filterSize, strides, pad, dimRoundingMode);
    var grad = function (dy, saved) {
        var y4D = saved[0];
        return {
            x: function () {
                return maxPoolBackprop(dy, x4D, y4D, filterSize, strides, pad);
            }
        };
    };
    var res = environment_1.ENV.engine.runKernel(function (backend, save) { return save(backend.maxPool(x4D, convInfo)); }, { x: x4D }, grad);
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    return res;
}
function avgPool_(x, filterSize, strides, pad, dimRoundingMode) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'avgPool');
    util.assert($x.dtype === 'float32', 'The input dtype to avgPool must be float32');
    var x4D = $x;
    var reshapedTo4D = false;
    if ($x.rank === 3) {
        reshapedTo4D = true;
        x4D = $x.as4D(1, $x.shape[0], $x.shape[1], $x.shape[2]);
    }
    util.assert(x4D.rank === 4, "Error in avgPool: x must be rank 4 but got rank " + x4D.rank + ".");
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), "Error in avgPool: pad must be an integer when using, " +
            ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."));
    }
    var convInfo = conv_util.computePool2DInfo(x4D.shape, filterSize, strides, pad);
    var grad = function (dy) {
        return { x: function () { return avgPoolBackprop(dy, x4D, filterSize, strides, pad); } };
    };
    var res = environment_1.ENV.engine.runKernel(function (backend) { return backend.avgPool(x4D, convInfo); }, { x: x4D }, grad);
    res = res.cast($x.dtype);
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    return res;
}
function maxPoolBackprop(dy, input, output, filterSize, strides, pad, dimRoundingMode) {
    var $dy = tensor_util_env_1.convertToTensor(dy, 'dy', 'maxPoolBackprop');
    var $input = tensor_util_env_1.convertToTensor(input, 'input', 'maxPoolBackprop');
    var $output = tensor_util_env_1.convertToTensor(output, 'output', 'maxPoolBackprop');
    util.assert($input.rank === $dy.rank, "Rank of input (" + $input.rank + ") does not match rank of dy (" + $dy.rank + ")");
    util.assert($dy.rank === 4, "Error in maxPoolBackprop: dy must be rank 4 but got rank " +
        ($dy.rank + "."));
    util.assert($input.rank === 4, "Error in maxPoolBackprop: input must be rank 4 but got rank " +
        ($input.rank + "."));
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), "Error in maxPoolBackprop: pad must be an integer when using, " +
            ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."));
    }
    var convInfo = conv_util.computePool2DInfo($input.shape, filterSize, strides, pad, dimRoundingMode);
    var res = environment_1.ENV.engine.runKernel(function (backend) { return backend.maxPoolBackprop($dy, $input, $output, convInfo); }, { $dy: $dy, $input: $input });
    return res;
}
function avgPoolBackprop(dy, input, filterSize, strides, pad) {
    var $dy = tensor_util_env_1.convertToTensor(dy, 'dy', 'avgPoolBackprop');
    var $input = tensor_util_env_1.convertToTensor(input, 'input', 'avgPoolBackprop');
    util.assert($input.rank === $dy.rank, "Rank of input (" + $input.rank + ") does not match rank of dy (" + $dy.rank + ")");
    var input4D = $input;
    var dy4D = $dy;
    var reshapedTo4D = false;
    if ($input.rank === 3) {
        reshapedTo4D = true;
        input4D = $input.as4D(1, $input.shape[0], $input.shape[1], $input.shape[2]);
        dy4D = $dy.as4D(1, $dy.shape[0], $dy.shape[1], $dy.shape[2]);
    }
    util.assert(dy4D.rank === 4, "Error in avgPoolBackprop: dy must be rank 4 but got rank " +
        (dy4D.rank + "."));
    util.assert(input4D.rank === 4, "Error in avgPoolBackprop: input must be rank 4 but got rank " +
        (input4D.rank + "."));
    var convInfo = conv_util.computePool2DInfo(input4D.shape, filterSize, strides, pad);
    var res = environment_1.ENV.engine.runKernel(function (backend) { return backend.avgPoolBackprop(dy4D, input4D, convInfo); }, { dy4D: dy4D, input4D: input4D });
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    return res;
}
exports.maxPool = operation_1.op({ maxPool_: maxPool_ });
exports.avgPool = operation_1.op({ avgPool_: avgPool_ });
//# sourceMappingURL=pool.js.map