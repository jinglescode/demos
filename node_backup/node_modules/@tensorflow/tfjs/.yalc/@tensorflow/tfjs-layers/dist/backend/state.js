"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var _nextUniqueTensorId = 0;
function getNextUniqueTensorId() {
    return _nextUniqueTensorId++;
}
exports.getNextUniqueTensorId = getNextUniqueTensorId;
var _uidPrefixes = {};
function getUid(prefix) {
    if (prefix === void 0) { prefix = ''; }
    if (!(prefix in _uidPrefixes)) {
        _uidPrefixes[prefix] = 0;
    }
    _uidPrefixes[prefix] += 1;
    return prefix + _uidPrefixes[prefix].toString();
}
exports.getUid = getUid;
var scalarCache = {
    float32: {},
    int32: {}
};
var DEFAULT_DTYPE = 'float32';
function getScalar(value, dtype) {
    if (dtype === undefined) {
        dtype = DEFAULT_DTYPE;
    }
    if (scalarCache[dtype][value] == null) {
        scalarCache[dtype][value] = tfjs_core_1.scalar(value, dtype);
        tfjs_core_1.keep(scalarCache[dtype][value]);
    }
    return scalarCache[dtype][value];
}
exports.getScalar = getScalar;
function disposeScalarCache() {
    for (var typeKey in scalarCache) {
        for (var key in scalarCache[typeKey]) {
            scalarCache[typeKey][key].dispose();
            delete scalarCache[typeKey][key];
        }
    }
}
exports.disposeScalarCache = disposeScalarCache;
//# sourceMappingURL=state.js.map