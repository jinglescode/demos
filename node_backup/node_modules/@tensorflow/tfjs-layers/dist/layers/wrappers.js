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
var tfc = require("@tensorflow/tfjs-core");
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var state_1 = require("../backend/state");
var K = require("../backend/tfjs_backend");
var common_1 = require("../common");
var topology_1 = require("../engine/topology");
var errors_1 = require("../errors");
var generic_utils = require("../utils/generic_utils");
var types_utils_1 = require("../utils/types_utils");
var recurrent_1 = require("./recurrent");
var serialization_1 = require("./serialization");
var Wrapper = (function (_super) {
    __extends(Wrapper, _super);
    function Wrapper(config) {
        var _this = _super.call(this, config) || this;
        _this.layer = config.layer;
        return _this;
    }
    Wrapper.prototype.build = function (inputShape) {
        this.built = true;
    };
    Object.defineProperty(Wrapper.prototype, "trainable", {
        get: function () {
            if (this.layer != null) {
                return this.layer.trainable;
            }
            else {
                return false;
            }
        },
        set: function (value) {
            if (this.layer != null) {
                this.layer.trainable = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wrapper.prototype, "trainableWeights", {
        get: function () {
            return this.layer.trainableWeights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wrapper.prototype, "nonTrainableWeights", {
        get: function () {
            return this.layer.nonTrainableWeights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wrapper.prototype, "updates", {
        get: function () {
            return this.layer._updates;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wrapper.prototype, "losses", {
        get: function () {
            return this.layer.losses;
        },
        enumerable: true,
        configurable: true
    });
    Wrapper.prototype.getWeights = function () {
        return this.layer.getWeights();
    };
    Wrapper.prototype.setWeights = function (weights) {
        this.layer.setWeights(weights);
    };
    Wrapper.prototype.getConfig = function () {
        var config = {
            'layer': {
                'className': this.layer.getClassName(),
                'config': this.layer.getConfig(),
            }
        };
        var baseConfig = _super.prototype.getConfig.call(this);
        Object.assign(config, baseConfig);
        return config;
    };
    Wrapper.fromConfig = function (cls, config, customObjects) {
        if (customObjects === void 0) { customObjects = {}; }
        var layerConfig = config['layer'];
        var layer = serialization_1.deserialize(layerConfig, customObjects);
        delete config['layer'];
        var newConfig = { layer: layer };
        Object.assign(newConfig, config);
        return new cls(newConfig);
    };
    return Wrapper;
}(topology_1.Layer));
exports.Wrapper = Wrapper;
var TimeDistributed = (function (_super) {
    __extends(TimeDistributed, _super);
    function TimeDistributed(config) {
        var _this = _super.call(this, config) || this;
        _this.supportsMasking = true;
        return _this;
    }
    TimeDistributed.prototype.build = function (inputShape) {
        inputShape = types_utils_1.getExactlyOneShape(inputShape);
        if (inputShape.length < 3) {
            throw new errors_1.ValueError("TimeDistributed layer expects an input shape >= 3D, but received " +
                ("input shape " + JSON.stringify(inputShape)));
        }
        this.inputSpec = [{ shape: inputShape }];
        var childInputShape = [inputShape[0]].concat(inputShape.slice(2));
        if (!this.layer.built) {
            this.layer.build(childInputShape);
            this.layer.built = true;
        }
        _super.prototype.build.call(this, inputShape);
    };
    TimeDistributed.prototype.computeOutputShape = function (inputShape) {
        inputShape = types_utils_1.getExactlyOneShape(inputShape);
        var childInputShape = [inputShape[0]].concat(inputShape.slice(2));
        var childOutputShape = this.layer.computeOutputShape(childInputShape);
        var timesteps = inputShape[1];
        return [childOutputShape[0], timesteps].concat(childOutputShape.slice(1));
    };
    TimeDistributed.prototype.call = function (inputs, kwargs) {
        var _this = this;
        return tfjs_core_1.tidy(function () {
            inputs = types_utils_1.getExactlyOneTensor(inputs);
            var step = function (inputs, states) {
                var output = types_utils_1.getExactlyOneTensor(_this.layer.call(inputs, kwargs));
                return [output, []];
            };
            var rnnOutputs = recurrent_1.rnn(step, inputs, [], false, null, null, false, true);
            var y = rnnOutputs[1];
            return y;
        });
    };
    TimeDistributed.className = 'TimeDistributed';
    return TimeDistributed;
}(Wrapper));
exports.TimeDistributed = TimeDistributed;
tfjs_core_1.serialization.registerClass(TimeDistributed);
exports.VALID_BIDIRECTIONAL_MERGE_MODES = ['sum', 'mul', 'concat', 'ave'];
function checkBidirectionalMergeMode(value) {
    generic_utils.checkStringTypeUnionValue(exports.VALID_BIDIRECTIONAL_MERGE_MODES, 'BidirectionalMergeMode', value);
}
exports.checkBidirectionalMergeMode = checkBidirectionalMergeMode;
var Bidirectional = (function (_super) {
    __extends(Bidirectional, _super);
    function Bidirectional(config) {
        var _this = _super.call(this, config) || this;
        var layerConfig = config.layer.getConfig();
        _this.forwardLayer =
            serialization_1.deserialize({ className: config.layer.getClassName(), config: layerConfig });
        layerConfig['goBackwards'] =
            layerConfig['goBackwards'] === true ? false : true;
        _this.backwardLayer =
            serialization_1.deserialize({ className: config.layer.getClassName(), config: layerConfig });
        _this.forwardLayer.name = 'forward_' + _this.forwardLayer.name;
        _this.backwardLayer.name = 'backward_' + _this.backwardLayer.name;
        checkBidirectionalMergeMode(config.mergeMode);
        _this.mergeMode = config.mergeMode;
        if (config.weights) {
            throw new errors_1.NotImplementedError('weights support is not implemented for Bidirectional layer yet.');
        }
        _this._stateful = config.layer.stateful;
        _this.returnSequences = config.layer.returnSequences;
        _this.returnState = config.layer.returnState;
        _this.supportsMasking = true;
        _this._trainable = true;
        _this.inputSpec = config.layer.inputSpec;
        _this.numConstants = null;
        return _this;
    }
    Object.defineProperty(Bidirectional.prototype, "trainable", {
        get: function () {
            return this._trainable;
        },
        set: function (value) {
            this._trainable = value;
            if (this.forwardLayer != null) {
                this.forwardLayer.trainable = value;
            }
            if (this.backwardLayer != null) {
                this.backwardLayer.trainable = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Bidirectional.prototype.getWeights = function () {
        return this.forwardLayer.getWeights().concat(this.backwardLayer.getWeights());
    };
    Bidirectional.prototype.setWeights = function (weights) {
        var numWeights = weights.length;
        var numeightsOver2 = Math.floor(numWeights / 2);
        this.forwardLayer.setWeights(weights.slice(0, numeightsOver2));
        this.backwardLayer.setWeights(weights.slice(numeightsOver2));
    };
    Bidirectional.prototype.computeOutputShape = function (inputShape) {
        var layerShapes = this.forwardLayer.computeOutputShape(inputShape);
        if (!(Array.isArray(layerShapes) && Array.isArray(layerShapes[0]))) {
            layerShapes = [layerShapes];
        }
        layerShapes = layerShapes;
        var outputShape;
        var outputShapes;
        var stateShape;
        if (this.returnState) {
            stateShape = layerShapes.slice(1);
            outputShape = layerShapes[0];
        }
        else {
            outputShape = layerShapes[0];
        }
        outputShape = outputShape;
        if (this.mergeMode === 'concat') {
            outputShape[outputShape.length - 1] *= 2;
            outputShapes = [outputShape];
        }
        else if (this.mergeMode == null) {
            outputShapes = [outputShape, outputShape.slice()];
        }
        else {
            outputShapes = [outputShape];
        }
        if (this.returnState) {
            if (this.mergeMode == null) {
                return outputShapes.concat(stateShape).concat(stateShape.slice());
            }
            return [outputShape].concat(stateShape).concat(stateShape.slice());
        }
        return generic_utils.singletonOrArray(outputShapes);
    };
    Bidirectional.prototype.apply = function (inputs, kwargs) {
        var initialState = kwargs == null ? null : kwargs['initialState'];
        var constants = kwargs == null ? null : kwargs['constants'];
        if (kwargs == null) {
            kwargs = {};
        }
        var standardized = recurrent_1.standardizeArgs(inputs, initialState, constants, this.numConstants);
        inputs = standardized.inputs;
        initialState = standardized.initialState;
        constants = standardized.constants;
        if (Array.isArray(inputs)) {
            initialState = inputs.slice(1);
            inputs = inputs[0];
        }
        if ((initialState == null || initialState.length === 0) &&
            constants == null) {
            return _super.prototype.apply.call(this, inputs, kwargs);
        }
        var additionalInputs = [];
        var additionalSpecs = [];
        if (initialState != null) {
            var numStates = initialState.length;
            if (numStates % 2 > 0) {
                throw new errors_1.ValueError('When passing `initialState` to a Bidrectional RNN, ' +
                    'the state should be an Array containing the states of ' +
                    'the underlying RNNs.');
            }
            kwargs['initialState'] = initialState;
            additionalInputs.push.apply(additionalInputs, initialState);
            var stateSpecs = initialState
                .map(function (state) { return new topology_1.InputSpec({ shape: state.shape }); });
            this.forwardLayer.stateSpec = stateSpecs.slice(0, numStates / 2);
            this.backwardLayer.stateSpec = stateSpecs.slice(numStates / 2);
            additionalSpecs.push.apply(additionalSpecs, stateSpecs);
        }
        if (constants != null) {
            throw new errors_1.NotImplementedError('Support for constants in Bidirectional layers is not ' +
                'implemented yet.');
        }
        var isSymbolicTensor = additionalInputs[0] instanceof topology_1.SymbolicTensor;
        for (var _i = 0, additionalInputs_1 = additionalInputs; _i < additionalInputs_1.length; _i++) {
            var tensor = additionalInputs_1[_i];
            if (tensor instanceof topology_1.SymbolicTensor !== isSymbolicTensor) {
                throw new errors_1.ValueError('The initial state of a Bidirectional layer cannot be ' +
                    'specified as a mix of symbolic and non-symbolic tensors');
            }
        }
        if (isSymbolicTensor) {
            var fullInput = [inputs].concat(additionalInputs);
            var fullInputSpec = this.inputSpec.concat(additionalSpecs);
            var originalInputSpec = this.inputSpec;
            this.inputSpec = fullInputSpec;
            var output = _super.prototype.apply.call(this, fullInput, kwargs);
            this.inputSpec = originalInputSpec;
            return output;
        }
        else {
            return _super.prototype.apply.call(this, inputs, kwargs);
        }
    };
    Bidirectional.prototype.call = function (inputs, kwargs) {
        var _this = this;
        return tfjs_core_1.tidy(function () {
            if (kwargs['mask'] != null) {
                throw new errors_1.NotImplementedError('The support for masking is not implemented for ' +
                    'Bidirectional layers yet.');
            }
            var initialState = kwargs['initialState'];
            var y;
            var yRev;
            if (initialState == null) {
                y = _this.forwardLayer.call(inputs, kwargs);
                yRev = _this.backwardLayer.call(inputs, kwargs);
            }
            else {
                var forwardState = initialState.slice(0, initialState.length / 2);
                var backwardState = initialState.slice(initialState.length / 2);
                y = _this.forwardLayer.call(inputs, Object.assign(kwargs, { initialState: forwardState }));
                yRev = _this.backwardLayer.call(inputs, Object.assign(kwargs, { initialState: backwardState }));
            }
            var states;
            if (_this.returnState) {
                if (Array.isArray(y)) {
                    states = y.slice(1).concat(yRev.slice(1));
                }
                else {
                }
                y = y[0];
                yRev = yRev[0];
            }
            if (_this.returnSequences) {
                yRev = tfc.reverse(yRev, 1);
            }
            var output;
            if (_this.mergeMode === 'concat') {
                output = K.concatenate([y, yRev]);
            }
            else if (_this.mergeMode === 'sum') {
                output = tfc.add(y, yRev);
            }
            else if (_this.mergeMode === 'ave') {
                output = tfc.mul(state_1.getScalar(0.5), tfc.add(y, yRev));
            }
            else if (_this.mergeMode === 'mul') {
                output = tfc.mul(y, yRev);
            }
            else if (_this.mergeMode == null) {
                output = [y, yRev];
            }
            if (_this.returnState) {
                if (_this.mergeMode == null) {
                    return output.concat(states);
                }
                return [output].concat(states);
            }
            return output;
        });
    };
    Bidirectional.prototype.resetStates = function (states) {
        this.forwardLayer.resetStates();
        this.backwardLayer.resetStates();
    };
    Bidirectional.prototype.build = function (inputShape) {
        var _this = this;
        common_1.nameScope(this.forwardLayer.name, function () {
            _this.forwardLayer.build(inputShape);
        });
        common_1.nameScope(this.backwardLayer.name, function () {
            _this.backwardLayer.build(inputShape);
        });
        this.built = true;
    };
    Object.defineProperty(Bidirectional.prototype, "trainableWeights", {
        get: function () {
            return this.forwardLayer.trainableWeights.concat(this.backwardLayer.trainableWeights);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bidirectional.prototype, "nonTrainableWeights", {
        get: function () {
            return this.forwardLayer.nonTrainableWeights.concat(this.backwardLayer.nonTrainableWeights);
        },
        enumerable: true,
        configurable: true
    });
    Bidirectional.prototype.getConfig = function () {
        var config = {
            'mergeMode': this.mergeMode,
        };
        var baseConfig = _super.prototype.getConfig.call(this);
        Object.assign(config, baseConfig);
        return config;
    };
    Bidirectional.fromConfig = function (cls, config) {
        var rnnLayer = serialization_1.deserialize(config['layer']);
        delete config['layer'];
        if (config['numConstants'] != null) {
            throw new errors_1.NotImplementedError("Deserialization of a Bidirectional layer with numConstants " +
                "present is not supported yet.");
        }
        var newConfig = config;
        newConfig['layer'] = rnnLayer;
        return new cls(newConfig);
    };
    Bidirectional.className = 'Bidirectional';
    return Bidirectional;
}(Wrapper));
exports.Bidirectional = Bidirectional;
tfjs_core_1.serialization.registerClass(Bidirectional);
//# sourceMappingURL=wrappers.js.map