"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../environment");
var tensor_util_env_1 = require("../tensor_util_env");
var util_1 = require("../util");
var axis_util_1 = require("./axis_util");
var concat_util_1 = require("./concat_util");
var operation_1 = require("./operation");
var tensor_ops_1 = require("./tensor_ops");
function concat1d_(tensors) {
    return exports.concat(tensors, 0);
}
function concat2d_(tensors, axis) {
    return exports.concat(tensors, axis);
}
function concat3d_(tensors, axis) {
    return exports.concat(tensors, axis);
}
function concat4d_(tensors, axis) {
    return exports.concat(tensors, axis);
}
function concat_(tensors, axis) {
    if (axis === void 0) { axis = 0; }
    util_1.assert(tensors.length >= 1, 'Pass at least one tensor to concat');
    var $tensors = tensor_util_env_1.convertToTensorArray(tensors, 'tensors', 'concat');
    var outShape = concat_util_1.computeOutShape($tensors.map(function (t) { return t.shape; }), axis);
    if (util_1.sizeFromShape(outShape) === 0) {
        return tensor_ops_1.tensor([], outShape);
    }
    $tensors = $tensors.filter(function (t) { return t.size > 0; });
    var result = $tensors[0];
    if ($tensors.length === 1) {
        return result;
    }
    var axes = axis_util_1.parseAxisParam(axis, result.shape);
    for (var i = 1; i < $tensors.length; ++i) {
        result = concat2Tensors(result, $tensors[i], axes[0]);
    }
    return result;
}
function concat2Tensors(a, b, axis) {
    concat_util_1.assertParams(a.shape, b.shape, axis);
    var outShape = concat_util_1.computeOutShape([a.shape, b.shape], axis);
    var a2D = a.as2D(-1, util_1.sizeFromShape(a.shape.slice(axis)));
    var b2D = b.as2D(-1, util_1.sizeFromShape(b.shape.slice(axis)));
    var _a = concat_util_1.computeGradientSliceShapes(a2D.shape, b2D.shape), aBegin = _a.aBegin, aSize = _a.aSize, bBegin = _a.bBegin, bSize = _a.bSize;
    var der = function (dy) {
        return { a: function () { return dy.slice(aBegin, aSize); }, b: function () { return dy.slice(bBegin, bSize); } };
    };
    var res = environment_1.ENV.engine.runKernel(function (backend) { return backend.concat(a2D, b2D); }, { a: a2D, b: b2D }, der);
    return res.reshape(outShape);
}
exports.concat = operation_1.op({ concat_: concat_ });
exports.concat1d = operation_1.op({ concat1d_: concat1d_ });
exports.concat2d = operation_1.op({ concat2d_: concat2d_ });
exports.concat3d = operation_1.op({ concat3d_: concat3d_ });
exports.concat4d = operation_1.op({ concat4d_: concat4d_ });
//# sourceMappingURL=concat.js.map