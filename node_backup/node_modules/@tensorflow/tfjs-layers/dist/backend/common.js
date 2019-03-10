"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var _epsilon = tfjs_core_1.ENV.get('EPSILON');
function epsilon() {
    return _epsilon;
}
exports.epsilon = epsilon;
function setEpsilon(e) {
    _epsilon = e;
}
exports.setEpsilon = setEpsilon;
function imageDataFormat() {
    return 'channelsLast';
}
exports.imageDataFormat = imageDataFormat;
//# sourceMappingURL=common.js.map