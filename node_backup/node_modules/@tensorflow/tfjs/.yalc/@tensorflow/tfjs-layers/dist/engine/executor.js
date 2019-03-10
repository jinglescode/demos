"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var errors_1 = require("../errors");
var input_layer_1 = require("./input_layer");
function assertFeedCompatibility(key, val) {
    if (key.shape != null) {
        if (key.shape.length !== val.shape.length) {
            throw new errors_1.ValueError("The rank of feed (" + val.shape.length + ") does not match the rank of " +
                ("the key (" + key.shape.length + ")."));
        }
        for (var i = 0; i < key.shape.length; ++i) {
            if (key.shape[i] != null && key.shape[i] !== val.shape[i]) {
                throw new errors_1.ValueError("The " + i + "-th dimension of the feed (" + val.shape[i] + ") is " +
                    ("incompatible with that of the key (" + key.shape[i] + ")."));
            }
        }
    }
    if (key.dtype == null || key.dtype === val.dtype) {
        return val;
    }
    try {
        return tfjs_core_1.cast(val, key.dtype);
    }
    catch (err) {
        throw new errors_1.ValueError("The dtype of the feed (" + val.dtype + ") can not be cast to the dtype " +
            ("of the key '" + key.name + "' (" + key.dtype + ")."));
    }
}
var FeedDict = (function () {
    function FeedDict(feeds) {
        this.id2Value = {};
        if (feeds instanceof FeedDict) {
            for (var id in feeds.id2Value) {
                this.id2Value[id] = feeds.id2Value[id];
            }
        }
        else {
            if (feeds == null) {
                return;
            }
            for (var _i = 0, feeds_1 = feeds; _i < feeds_1.length; _i++) {
                var feed = feeds_1[_i];
                this.add(feed.key, feed.value);
            }
        }
    }
    FeedDict.prototype.add = function (key, value) {
        if (this.id2Value[key.id] == null) {
            this.id2Value[key.id] = assertFeedCompatibility(key, value);
        }
        else {
            throw new errors_1.ValueError("Duplicate key: name=" + key.name + ", id=" + key.id);
        }
        return this;
    };
    FeedDict.prototype.addFeed = function (feed) {
        this.add(feed.key, feed.value);
    };
    FeedDict.prototype.hasKey = function (key) {
        return this.id2Value[key.id] != null;
    };
    FeedDict.prototype.getValue = function (key) {
        if (this.id2Value[key.id] == null) {
            throw new errors_1.ValueError("Nonexistent key: " + JSON.stringify(key));
        }
        else {
            return this.id2Value[key.id];
        }
    };
    return FeedDict;
}());
exports.FeedDict = FeedDict;
function execute(fetches, feedDict, kwargs) {
    var arrayFetches = Array.isArray(fetches);
    var fetchArray = arrayFetches ? fetches : [fetches];
    var outputs = [];
    var internalFeedDict = new FeedDict(feedDict);
    for (var _i = 0, fetchArray_1 = fetchArray; _i < fetchArray_1.length; _i++) {
        var fetch_1 = fetchArray_1[_i];
        outputs.push(executeInternal(fetch_1, internalFeedDict, kwargs));
    }
    return arrayFetches ? outputs : outputs[0];
}
exports.execute = execute;
function executeInternal(fetch, internalFeedDict, kwargs) {
    if (internalFeedDict.hasKey(fetch)) {
        return internalFeedDict.getValue(fetch);
    }
    if (fetch.sourceLayer instanceof input_layer_1.InputLayer) {
        throw new errors_1.ValueError("Missing a feed value for SymbolicTensor from InputLayer " +
            ("'" + input_layer_1.InputLayer.name + "'"));
    }
    var inputs = fetch.inputs;
    var inputValues = [];
    for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
        var input = inputs_1[_i];
        var inputVal = executeInternal(input, internalFeedDict, kwargs);
        inputValues.push(inputVal);
    }
    var output = fetch.sourceLayer.apply(inputValues, kwargs);
    if (!Array.isArray(output)) {
        output = [output];
    }
    var layerOutputs = getNodeOutputs(fetch);
    var outputSymbolicTensors = Array.isArray(layerOutputs) ? layerOutputs : [layerOutputs];
    for (var i = 0; i < outputSymbolicTensors.length; ++i) {
        internalFeedDict.add(outputSymbolicTensors[i], output[i]);
    }
    return output.length === 1 ? output[0] : output[fetch.outputTensorIndex];
}
function getNodeOutputs(fetch) {
    var layerOutputs;
    if (fetch.sourceLayer.inboundNodes.length === 1) {
        layerOutputs = fetch.sourceLayer.output;
    }
    else {
        var nodeIndex = null;
        for (var i = 0; i < fetch.sourceLayer.inboundNodes.length; ++i) {
            for (var _i = 0, _a = fetch.sourceLayer.inboundNodes[i]
                .outputTensors; _i < _a.length; _i++) {
                var outputTensor = _a[_i];
                if (outputTensor.id === fetch.id) {
                    nodeIndex = i;
                    break;
                }
            }
        }
        layerOutputs = fetch.sourceLayer.getOutputAt(nodeIndex);
    }
    return layerOutputs;
}
//# sourceMappingURL=executor.js.map