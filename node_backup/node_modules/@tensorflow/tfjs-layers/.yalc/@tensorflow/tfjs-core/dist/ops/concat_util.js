"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../util");
function assertParams(aShape, bShape, axis) {
    var aRank = aShape.length;
    var bRank = bShape.length;
    util.assert(aShape.length === bShape.length, "Error in concat" + aRank + "D: rank of x1 (" + aRank + ") and x2 (" + bRank + ") " +
        "must be the same.");
    util.assert(axis >= 0 && axis < aRank, "Error in concat" + aRank + "D: axis must be " +
        ("between 0 and " + (aRank - 1) + "."));
    for (var i = 0; i < aRank; i++) {
        util.assert((i === axis) || (aShape[i] === bShape[i]), "Error in concat" + aRank + "D: Shape (" + aShape + ") does not match " +
            ("(" + bShape + ") along the non-concatenated axis " + i + "."));
    }
}
exports.assertParams = assertParams;
function computeOutShape(shapes, axis) {
    var outputShape = shapes[0].slice();
    for (var i = 1; i < shapes.length; i++) {
        outputShape[axis] += shapes[i][axis];
    }
    return outputShape;
}
exports.computeOutShape = computeOutShape;
function computeGradientSliceShapes(aShape, bShape) {
    return {
        aBegin: [0, 0],
        aSize: aShape,
        bBegin: [0, aShape[1]],
        bSize: bShape
    };
}
exports.computeGradientSliceShapes = computeGradientSliceShapes;
//# sourceMappingURL=concat_util.js.map