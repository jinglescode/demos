"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
function isArrayOfShapes(x) {
    return Array.isArray(x) && Array.isArray(x[0]);
}
exports.isArrayOfShapes = isArrayOfShapes;
function normalizeShapeList(x) {
    if (x.length === 0) {
        return [];
    }
    if (!Array.isArray(x[0])) {
        return [x];
    }
    return x;
}
exports.normalizeShapeList = normalizeShapeList;
function getExactlyOneTensor(xs) {
    var x;
    if (Array.isArray(xs)) {
        if (xs.length !== 1) {
            throw new errors_1.ValueError("Expected Tensor length to be 1; got " + xs.length);
        }
        x = xs[0];
    }
    else {
        x = xs;
    }
    return x;
}
exports.getExactlyOneTensor = getExactlyOneTensor;
function getExactlyOneShape(shapes) {
    if (Array.isArray(shapes) && Array.isArray(shapes[0])) {
        if (shapes.length === 1) {
            shapes = shapes;
            return shapes[0];
        }
        else {
            throw new errors_1.ValueError("Expected exactly 1 Shape; got " + shapes.length);
        }
    }
    else {
        return shapes;
    }
}
exports.getExactlyOneShape = getExactlyOneShape;
//# sourceMappingURL=types_utils.js.map