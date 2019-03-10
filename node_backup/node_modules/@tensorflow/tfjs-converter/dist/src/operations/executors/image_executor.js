"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tfc = require("@tensorflow/tfjs-core");
var utils_1 = require("./utils");
exports.executeOp = function (node, tensorMap, context) {
    switch (node.op) {
        case 'resizeBilinear': {
            var images = utils_1.getParamValue('images', node, tensorMap, context);
            var size = utils_1.getParamValue('size', node, tensorMap, context);
            var alignCorners = utils_1.getParamValue('alignCorners', node, tensorMap, context);
            return [tfc.image.resizeBilinear(images, [size[0], size[1]], alignCorners)];
        }
        case 'resizeNearestNeighbor': {
            var images = utils_1.getParamValue('images', node, tensorMap, context);
            var size = utils_1.getParamValue('size', node, tensorMap, context);
            var alignCorners = utils_1.getParamValue('alignCorners', node, tensorMap, context);
            return [tfc.image.resizeNearestNeighbor(images, [size[0], size[1]], alignCorners)];
        }
        case 'cropAndResize': {
            var image = utils_1.getParamValue('image', node, tensorMap, context);
            var boxes = utils_1.getParamValue('boxes', node, tensorMap, context);
            var boxInd = utils_1.getParamValue('boxInd', node, tensorMap, context);
            var cropSize = utils_1.getParamValue('cropSize', node, tensorMap, context);
            var method = utils_1.getParamValue('method', node, tensorMap, context);
            var extrapolationValue = utils_1.getParamValue('extrapolationValue', node, tensorMap, context);
            return [tfc.image.cropAndResize(image, boxes, boxInd, cropSize, method, extrapolationValue)];
        }
        default:
            throw TypeError("Node type " + node.op + " is not implemented");
    }
};
exports.CATEGORY = 'image';
//# sourceMappingURL=image_executor.js.map