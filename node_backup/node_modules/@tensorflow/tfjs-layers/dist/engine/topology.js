"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var state_1 = require("../backend/state");
var common_1 = require("../common");
var errors_1 = require("../errors");
var generic_utils = require("../utils/generic_utils");
var types_utils = require("../utils/types_utils");
var variable_utils = require("../utils/variable_utils");
var variables_1 = require("../variables");
var InputSpec = (function () {
    function InputSpec(config) {
        this.dtype = config.dtype;
        this.shape = config.shape;
        if (config.shape != null) {
            this.ndim = config.shape.length;
        }
        else {
            this.ndim = config.ndim;
        }
        this.maxNDim = config.maxNDim;
        this.minNDim = config.minNDim;
        this.axes = config.axes || {};
    }
    return InputSpec;
}());
exports.InputSpec = InputSpec;
var SymbolicTensor = (function () {
    function SymbolicTensor(dtype, shape, sourceLayer, inputs, callArgs, name, outputTensorIndex) {
        this.dtype = dtype;
        this.shape = shape;
        this.sourceLayer = sourceLayer;
        this.inputs = inputs;
        this.callArgs = callArgs;
        this.outputTensorIndex = outputTensorIndex;
        this.id = state_1.getNextUniqueTensorId();
        if (name != null) {
            this.originalName = common_1.getScopedTensorName(name);
            this.name = common_1.getUniqueTensorName(this.originalName);
        }
        this.rank = shape.length;
    }
    return SymbolicTensor;
}());
exports.SymbolicTensor = SymbolicTensor;
var _nextNodeID = 0;
var Node = (function () {
    function Node(config, callArgs) {
        this.callArgs = callArgs;
        this.id = _nextNodeID++;
        this.outboundLayer = config.outboundLayer;
        this.inboundLayers = config.inboundLayers;
        this.nodeIndices = config.nodeIndices;
        this.tensorIndices = config.tensorIndices;
        this.inputTensors = config.inputTensors;
        this.outputTensors = config.outputTensors;
        this.inputMasks = config.inputMasks;
        this.outputMasks = config.outputMasks;
        this.inputShapes = config.inputShapes;
        this.outputShapes = config.outputShapes;
        for (var _i = 0, _a = config.inboundLayers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (layer != null) {
                layer.outboundNodes.push(this);
            }
        }
        config.outboundLayer.inboundNodes.push(this);
    }
    Node.prototype.getConfig = function () {
        var inboundNames = [];
        for (var _i = 0, _a = this.inboundLayers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (layer != null) {
                inboundNames.push(layer.name);
            }
            else {
                inboundNames.push(null);
            }
        }
        return {
            outboundLayer: this.outboundLayer ? this.outboundLayer.name : null,
            inboundLayers: inboundNames,
            nodeIndices: this.nodeIndices,
            tensorIndices: this.tensorIndices
        };
    };
    return Node;
}());
exports.Node = Node;
var _nextLayerID = 0;
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer(config) {
        var _this = _super.call(this) || this;
        _this._callHook = null;
        _this._addedWeightNames = [];
        _this._stateful = false;
        _this.id = _nextLayerID++;
        _this.activityRegularizer = null;
        _this.inputSpec = null;
        _this.supportsMasking = false;
        _this._trainableWeights = [];
        _this._nonTrainableWeights = [];
        _this._losses = [];
        _this._updates = [];
        _this._built = false;
        _this.inboundNodes = [];
        _this.outboundNodes = [];
        var name = config.name;
        if (!name) {
            var prefix = _this.getClassName();
            name = generic_utils.toSnakeCase(prefix) + '_' + state_1.getUid(prefix);
        }
        _this.name = name;
        _this.trainable = config.trainable == null ? true : config.trainable;
        _this.updatable = config.updatable == null ? true : config.updatable;
        if (config.inputShape != null || config.batchInputShape != null) {
            var batchInputShape = void 0;
            if (config.batchInputShape != null) {
                batchInputShape = config.batchInputShape;
            }
            else if (config.inputShape != null) {
                var batchSize = null;
                if (config.batchSize != null) {
                    batchSize = config.batchSize;
                }
                batchInputShape = [batchSize].concat(config.inputShape);
            }
            _this.batchInputShape = batchInputShape;
            var dtype = config.dtype;
            if (dtype == null) {
                dtype = config.inputDType;
            }
            if (dtype == null) {
                dtype = 'float32';
            }
            _this.dtype = dtype;
        }
        if (config.weights != null) {
            _this.initialWeights = config.weights;
        }
        else {
            _this.initialWeights = null;
        }
        _this._refCount = null;
        return _this;
    }
    Layer.nodeKey = function (layer, nodeIndex) {
        return layer.name + '_ib-' + nodeIndex.toString();
    };
    Layer.prototype.getNodeAtIndex = function (nodeIndex, attrName) {
        if (this.inboundNodes.length === 0) {
            throw new errors_1.RuntimeError('The layer has never been called ' +
                ("and thus has no defined " + attrName + "."));
        }
        if (this.inboundNodes.length <= nodeIndex) {
            throw new errors_1.ValueError("Asked to get " + attrName + " at node " + nodeIndex + ", " +
                ("but the layer has only " + this.inboundNodes.length + " inbound nodes."));
        }
        return this.inboundNodes[nodeIndex];
    };
    Layer.prototype.getInputAt = function (nodeIndex) {
        return generic_utils.singletonOrArray(this.getNodeAtIndex(nodeIndex, 'input').inputTensors);
    };
    Layer.prototype.getOutputAt = function (nodeIndex) {
        return generic_utils.singletonOrArray(this.getNodeAtIndex(nodeIndex, 'output').outputTensors);
    };
    Object.defineProperty(Layer.prototype, "input", {
        get: function () {
            if (this.inboundNodes.length > 1) {
                throw new errors_1.AttributeError("Layer " + this.name +
                    ' has multiple inbound nodes, ' +
                    'hence the notion of "layer input" ' +
                    'is ill-defined. ' +
                    'Use `getInputAt(nodeIndex)` instead.');
            }
            else if (this.inboundNodes.length === 0) {
                throw new errors_1.AttributeError("Layer " + this.name +
                    ' is not connected, no input to return.');
            }
            return generic_utils.singletonOrArray(this.getNodeAtIndex(0, 'input').inputTensors);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "output", {
        get: function () {
            if (this.inboundNodes.length === 0) {
                throw new errors_1.AttributeError("Layer " + this.name +
                    ' has no inbound nodes.');
            }
            if (this.inboundNodes.length > 1) {
                throw new errors_1.AttributeError("Layer " + this.name +
                    ' has multiple inbound nodes, ' +
                    'hence the notion of "layer output" ' +
                    'is ill-defined. ' +
                    'Use `getOutputAt(nodeIndex)` instead.');
            }
            return generic_utils.singletonOrArray(this.getNodeAtIndex(0, 'output').outputTensors);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "losses", {
        get: function () {
            return this._losses;
        },
        enumerable: true,
        configurable: true
    });
    Layer.prototype.calculateLosses = function () {
        return this.losses.map(function (lossFn) { return lossFn(); });
    };
    Object.defineProperty(Layer.prototype, "updates", {
        get: function () {
            return this._updates;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "built", {
        get: function () {
            return this._built;
        },
        set: function (built) {
            this._built = built;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "trainableWeights", {
        get: function () {
            if (this.trainable) {
                return this._trainableWeights;
            }
            else {
                return [];
            }
        },
        set: function (weights) {
            this._trainableWeights = weights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "nonTrainableWeights", {
        get: function () {
            if (!this.trainable) {
                return this._trainableWeights.concat(this._nonTrainableWeights);
            }
            else {
                return this._nonTrainableWeights;
            }
        },
        set: function (weights) {
            this._nonTrainableWeights = weights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "weights", {
        get: function () {
            return this.trainableWeights.concat(this.nonTrainableWeights);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "stateful", {
        get: function () {
            return this._stateful;
        },
        enumerable: true,
        configurable: true
    });
    Layer.prototype.resetStates = function () {
        if (!this.stateful) {
            throw new Error('Cannot call the resetStates() method of a non-stateful Layer ' +
                'object.');
        }
    };
    Layer.prototype.assertInputCompatibility = function (inputs) {
        inputs = generic_utils.toList(inputs);
        if (this.inputSpec == null || this.inputSpec.length === 0) {
            return;
        }
        var inputSpec = generic_utils.toList(this.inputSpec);
        if (inputs.length !== inputSpec.length) {
            throw new errors_1.ValueError("Layer " + this.name + " expects " + inputSpec.length + " inputs, " +
                ("but it received " + inputs.length + " input tensors. ") +
                ("Input received: " + inputs));
        }
        for (var inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
            var x = inputs[inputIndex];
            var spec = inputSpec[inputIndex];
            if (spec == null) {
                continue;
            }
            var ndim = x.rank;
            if (spec.ndim != null) {
                if (ndim !== spec.ndim) {
                    throw new errors_1.ValueError("Input " + inputIndex + " is incompatible with layer " + this.name + ": " +
                        ("expected ndim=" + spec.ndim + ", found ndim=" + ndim));
                }
            }
            if (spec.maxNDim != null) {
                if (ndim > spec.maxNDim) {
                    throw new errors_1.ValueError("Input " + inputIndex + " is incompatible with layer " + this.name +
                        (": expected max_ndim=" + spec.maxNDim + ", found ndim=" + ndim));
                }
            }
            if (spec.minNDim != null) {
                if (ndim < spec.minNDim) {
                    throw new errors_1.ValueError("Input " + inputIndex + " is incompatible with layer " + this.name +
                        (": expected min_ndim=" + spec.minNDim + ", found ndim=" + ndim + "."));
                }
            }
            if (spec.dtype != null) {
                if (x.dtype !== spec.dtype) {
                    throw new errors_1.ValueError("Input " + inputIndex + " is incompatible with layer " + this.name + " " +
                        (": expected dtype=" + spec.dtype + ", found dtype=" + x.dtype + "."));
                }
            }
            if (spec.axes) {
                var xShape = x.shape;
                for (var key in spec.axes) {
                    var axis = Number(key);
                    var value = spec.axes[key];
                    var xShapeAtAxis = axis >= 0 ? xShape[axis] : xShape[xShape.length + axis];
                    if (value != null && [value, null].indexOf(xShapeAtAxis) === -1) {
                        throw new errors_1.ValueError("Input " + inputIndex + " is incompatible with layer " +
                            (this.name + ": expected axis " + axis + " of input shape to ") +
                            ("have value " + value + " but got shape " + xShape + "."));
                    }
                }
            }
            if (spec.shape != null) {
                for (var i = 0; i < spec.shape.length; ++i) {
                    var specDim = spec.shape[i];
                    var dim = x.shape[i];
                    if (specDim != null && dim != null) {
                        if (specDim !== dim) {
                            throw new errors_1.ValueError("Input " + inputIndex + " is incompatible with layer " +
                                (this.name + ": expected shape=" + spec.shape + ", ") +
                                'found shape=${xShape}.');
                        }
                    }
                }
            }
        }
    };
    Layer.prototype.call = function (inputs, kwargs) {
        return inputs;
    };
    Layer.prototype.invokeCallHook = function (inputs, kwargs) {
        if (this._callHook != null) {
            this._callHook(inputs, kwargs);
        }
    };
    Layer.prototype.setCallHook = function (callHook) {
        this._callHook = callHook;
    };
    Layer.prototype.clearCallHook = function () {
        this._callHook = null;
    };
    Layer.prototype.apply = function (inputs, kwargs) {
        var _this = this;
        kwargs = kwargs || {};
        this.assertNotDisposed();
        var inputsList = generic_utils.toList(inputs);
        var allAreSymbolic = true;
        for (var _i = 0, inputsList_1 = inputsList; _i < inputsList_1.length; _i++) {
            var input = inputsList_1[_i];
            if (!(input instanceof SymbolicTensor)) {
                allAreSymbolic = false;
                break;
            }
        }
        var noneAreSymbolic = true;
        for (var _a = 0, inputsList_2 = inputsList; _a < inputsList_2.length; _a++) {
            var input = inputsList_2[_a];
            if (input instanceof SymbolicTensor) {
                noneAreSymbolic = false;
                break;
            }
        }
        if (allAreSymbolic === noneAreSymbolic) {
            throw new errors_1.ValueError('Arguments to apply() must be all ' +
                'SymbolicTensors or all Tensors');
        }
        return common_1.nameScope(this.name, function () {
            if (!_this.built) {
                _this.assertInputCompatibility(inputs);
                var inputShapes = [];
                for (var _i = 0, _a = generic_utils.toList(inputs); _i < _a.length; _i++) {
                    var xElem = _a[_i];
                    inputShapes.push(xElem.shape);
                }
                _this.build(generic_utils.singletonOrArray(inputShapes));
                _this.built = true;
                if (_this.initialWeights) {
                    _this.setWeights(_this.initialWeights);
                }
                if (_this._refCount === null && noneAreSymbolic) {
                    _this._refCount = 1;
                }
            }
            _this.assertInputCompatibility(inputs);
            if (noneAreSymbolic) {
                var output = _this.call(inputs, kwargs);
                var outputList = generic_utils.toList(output);
                var outputListCopy = [];
                for (var _b = 0, outputList_1 = outputList; _b < outputList_1.length; _b++) {
                    var x = outputList_1[_b];
                    if (inputsList.indexOf(x) !== -1) {
                        x = x.clone();
                    }
                    outputListCopy.push(x);
                }
                output = generic_utils.singletonOrArray(outputListCopy);
                if (_this.activityRegularizer != null) {
                    throw new errors_1.NotImplementedError('Layer invocation in the presence of activity ' +
                        'regularizer(s) is not supported yet.');
                }
                return output;
            }
            else {
                var inputShape = collectInputShape(inputs);
                var outputShape = _this.computeOutputShape(inputShape);
                var output = void 0;
                var outputDType_1 = guessOutputDType(inputs);
                _this.warnOnIncompatibleInputShape(Array.isArray(inputs) ? inputShape[0] :
                    inputShape);
                if (outputShape != null && outputShape.length > 0 &&
                    Array.isArray(outputShape[0])) {
                    output = outputShape
                        .map(function (shape, index) { return new SymbolicTensor(outputDType_1, shape, _this, generic_utils.toList(inputs), kwargs, _this.name, index); });
                }
                else {
                    output = new SymbolicTensor(outputDType_1, outputShape, _this, generic_utils.toList(inputs), kwargs, _this.name);
                }
                _this.addInboundNode(inputs, output, null, null, inputShape, outputShape, kwargs);
                _this._refCount++;
                if (_this.activityRegularizer != null) {
                    throw new errors_1.NotImplementedError('Layer invocation in the presence of activity ' +
                        'regularizer(s) is not supported yet.');
                }
                return output;
            }
        });
    };
    Layer.prototype.warnOnIncompatibleInputShape = function (inputShape) {
        if (this.batchInputShape == null) {
            return;
        }
        else if (inputShape.length !== this.batchInputShape.length) {
            console.warn("The rank of the input tensor provided (shape: " +
                (JSON.stringify(inputShape) + ") does not match that of the ") +
                ("batchInputShape (" + JSON.stringify(this.batchInputShape) + ") ") +
                ("of the layer " + this.name));
        }
        else {
            var dimMismatch_1 = false;
            this.batchInputShape.forEach(function (dimension, i) {
                if (dimension != null && inputShape[i] != null &&
                    inputShape[i] !== dimension) {
                    dimMismatch_1 = true;
                }
            });
            if (dimMismatch_1) {
                console.warn("The shape of the input tensor " +
                    ("(" + JSON.stringify(inputShape) + ") does not ") +
                    ("match the expectation of layer " + this.name + ": ") +
                    ("" + JSON.stringify(this.batchInputShape)));
            }
        }
    };
    Object.defineProperty(Layer.prototype, "outputShape", {
        get: function () {
            if (this.inboundNodes == null || this.inboundNodes.length === 0) {
                throw new errors_1.AttributeError("The layer " + this.name + " has never been called and thus has no " +
                    "defined output shape.");
            }
            var allOutputShapes = [];
            for (var _i = 0, _a = this.inboundNodes; _i < _a.length; _i++) {
                var node = _a[_i];
                var shapeString = JSON.stringify(node.outputShapes);
                if (allOutputShapes.indexOf(shapeString) === -1) {
                    allOutputShapes.push(shapeString);
                }
            }
            if (allOutputShapes.length === 1) {
                var outputShapes = this.inboundNodes[0].outputShapes;
                if (Array.isArray(outputShapes) && Array.isArray(outputShapes[0]) &&
                    outputShapes.length === 1) {
                    return outputShapes[0];
                }
                else {
                    return outputShapes;
                }
            }
            else {
                throw new errors_1.AttributeError("The layer " + this.name + " has multiple inbound nodes with different " +
                    "output shapes. Hence the notion of \"outut shape\" is ill-defined " +
                    "for the layer.");
            }
        },
        enumerable: true,
        configurable: true
    });
    Layer.prototype.countParams = function () {
        if (!this.built) {
            throw new errors_1.RuntimeError("You tried to call countParams() on " + this.name + ", " +
                "but the layer is not built yet. Build it first by calling " +
                "build(batchInputShape).");
        }
        return variable_utils.countParamsInWeights(this.weights);
    };
    Layer.prototype.build = function (inputShape) {
        this.built = true;
    };
    Layer.prototype.getWeights = function (trainableOnly) {
        if (trainableOnly === void 0) { trainableOnly = false; }
        return variables_1.batchGetValue(trainableOnly ? this.trainableWeights : this.weights);
    };
    Layer.prototype.setWeights = function (weights) {
        var _this = this;
        tfjs_core_1.tidy(function () {
            var params = _this.weights;
            if (params.length !== weights.length) {
                throw new errors_1.ValueError("You called setWeights(weights) on layer \"" + _this.name + "\" " +
                    ("with a weight list of length " + weights.length + ", ") +
                    ("but the layer was expecting " + params.length + " weights. ") +
                    ("Provided weights: " + weights + "..."));
            }
            if (params.length === 0) {
                return;
            }
            var weightValueTuples = [];
            var paramValues = variables_1.batchGetValue(params);
            for (var i = 0; i < paramValues.length; ++i) {
                var pv = paramValues[i];
                var p = params[i];
                var w = weights[i];
                if (!tfjs_core_1.util.arraysEqual(pv.shape, w.shape)) {
                    throw new errors_1.ValueError("Layer weight shape " + pv.shape + " " +
                        ("not compatible with provided weight shape " + w.shape));
                }
                weightValueTuples.push([p, w]);
            }
            variables_1.batchSetValue(weightValueTuples);
        });
    };
    Layer.prototype.addWeight = function (name, shape, dtype, initializer, regularizer, trainable, constraint) {
        if (this._addedWeightNames.indexOf(name) !== -1) {
            throw new errors_1.ValueError("Duplicate weight name " + name + " for layer " + this.name);
        }
        this._addedWeightNames.push(name);
        if (dtype == null) {
            dtype = 'float32';
        }
        var weight = new variables_1.LayerVariable(initializer.apply(shape, dtype), dtype, name, trainable, constraint);
        if (regularizer != null) {
            this.addLoss(function () { return regularizer.apply(weight.read()); });
        }
        if (trainable == null) {
            trainable = true;
        }
        if (trainable) {
            this._trainableWeights.push(weight);
        }
        else {
            this._nonTrainableWeights.push(weight);
        }
        return weight;
    };
    Layer.prototype.addLoss = function (losses) {
        if (losses == null || Array.isArray(losses) && losses.length === 0) {
            return;
        }
        losses = generic_utils.toList(losses);
        if (this._losses !== undefined && this._losses !== null) {
            (_a = this.losses).push.apply(_a, losses);
        }
        var _a;
    };
    Layer.prototype.computeOutputShape = function (inputShape) {
        return inputShape;
    };
    Layer.prototype.computeMask = function (inputs, mask) {
        var _this = this;
        if (!this.supportsMasking) {
            if (mask != null) {
                if (Array.isArray(mask)) {
                    mask.forEach(function (maskElement) {
                        if (maskElement != null) {
                            throw new TypeError("Layer " + _this.name + " does not support masking," +
                                'but was passed an inputMask.');
                        }
                    });
                }
                else {
                    throw new TypeError("Layer " + this.name + " does not support masking," +
                        'but was passed an inputMask.');
                }
            }
            return null;
        }
        return mask;
    };
    Layer.prototype.addInboundNode = function (inputTensors, outputTensors, inputMasks, outputMasks, inputShapes, outputShapes, kwargs) {
        if (kwargs === void 0) { kwargs = null; }
        var inputTensorList = generic_utils.toList(inputTensors);
        outputTensors = generic_utils.toList(outputTensors);
        inputMasks = generic_utils.toList(inputMasks);
        outputMasks = generic_utils.toList(outputMasks);
        inputShapes = types_utils.normalizeShapeList(inputShapes);
        outputShapes = types_utils.normalizeShapeList(outputShapes);
        var inboundLayers = [];
        var nodeIndices = [];
        var tensorIndices = [];
        for (var _i = 0, inputTensorList_1 = inputTensorList; _i < inputTensorList_1.length; _i++) {
            var x = inputTensorList_1[_i];
            inboundLayers.push(x.sourceLayer);
            nodeIndices.push(x.nodeIndex);
            tensorIndices.push(x.tensorIndex);
        }
        new Node({
            outboundLayer: this,
            inboundLayers: inboundLayers,
            nodeIndices: nodeIndices,
            tensorIndices: tensorIndices,
            inputTensors: inputTensorList,
            outputTensors: outputTensors,
            inputMasks: inputMasks,
            outputMasks: outputMasks,
            inputShapes: inputShapes,
            outputShapes: outputShapes
        }, kwargs);
        for (var i = 0; i < outputTensors.length; i++) {
            outputTensors[i].sourceLayer = this;
            outputTensors[i].nodeIndex = this.inboundNodes.length - 1;
            outputTensors[i].tensorIndex = i;
        }
    };
    Layer.prototype.getConfig = function () {
        var config = { name: this.name, trainable: this.trainable };
        if (this.batchInputShape != null) {
            config['batchInputShape'] = this.batchInputShape;
        }
        if (this.dtype != null) {
            config['dtype'] = this.dtype;
        }
        return config;
    };
    Layer.prototype.disposeWeights = function () {
        this.weights.forEach(function (weight) { return weight.dispose(); });
        return this.weights.length;
    };
    Layer.prototype.assertNotDisposed = function () {
        if (this._refCount === 0) {
            throw new Error("Layer '" + this.name + "' is already disposed.");
        }
    };
    Layer.prototype.dispose = function () {
        if (!this.built) {
            throw new Error("Cannot dispose Layer " + this.name + " because it has not been " +
                "built yet.");
        }
        if (this._refCount === null) {
            throw new Error("Cannot dispose Layer " + this.name + " because it has not been used " +
                "yet.");
        }
        this.assertNotDisposed();
        var numDisposedVariables = 0;
        if (--this._refCount === 0) {
            numDisposedVariables = this.disposeWeights();
        }
        return {
            refCountAfterDispose: this._refCount,
            numDisposedVariables: numDisposedVariables
        };
    };
    return Layer;
}(tfjs_core_1.serialization.Serializable));
exports.Layer = Layer;
function collectInputShape(inputTensors) {
    inputTensors =
        generic_utils.toList(inputTensors);
    var shapes = [];
    for (var _i = 0, inputTensors_1 = inputTensors; _i < inputTensors_1.length; _i++) {
        var x = inputTensors_1[_i];
        shapes.push(x.shape);
    }
    return generic_utils.singletonOrArray(shapes);
}
function guessOutputDType(inputTensors) {
    return 'float32';
}
function getSourceInputs(tensor, layer, nodeIndex) {
    if (layer == null || (nodeIndex != null && nodeIndex > 0)) {
        layer = tensor.sourceLayer;
        nodeIndex = tensor.nodeIndex;
    }
    if (layer.inboundNodes.length === 0) {
        return [tensor];
    }
    else {
        var node = layer.inboundNodes[nodeIndex];
        if (node.inboundLayers.length === 0) {
            return node.inputTensors;
        }
        else {
            var sourceTensors = [];
            for (var i = 0; i < node.inboundLayers.length; i++) {
                var x = node.inputTensors[i];
                var layer_1 = node.inboundLayers[i];
                var nodeIndex_1 = node.nodeIndices[i];
                var previousSources = getSourceInputs(x, layer_1, nodeIndex_1);
                for (var _i = 0, previousSources_1 = previousSources; _i < previousSources_1.length; _i++) {
                    var x_1 = previousSources_1[_i];
                    if (sourceTensors.indexOf(x_1) === -1) {
                        sourceTensors.push(x_1);
                    }
                }
            }
            return sourceTensors;
        }
    }
}
exports.getSourceInputs = getSourceInputs;
//# sourceMappingURL=topology.js.map