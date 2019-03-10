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
var state_1 = require("./backend/state");
var K = require("./backend/tfjs_backend");
var generic_utils_1 = require("./utils/generic_utils");
var Regularizer = (function (_super) {
    __extends(Regularizer, _super);
    function Regularizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Regularizer;
}(tfjs_core_1.serialization.Serializable));
exports.Regularizer = Regularizer;
var L1L2 = (function (_super) {
    __extends(L1L2, _super);
    function L1L2(config) {
        var _this = _super.call(this) || this;
        var l1 = config == null || config.l1 == null ? 0.01 : config.l1;
        var l2 = config == null || config.l2 == null ? 0.01 : config.l2;
        _this.hasL1 = l1 !== 0;
        _this.hasL2 = l2 !== 0;
        _this.l1 = state_1.getScalar(l1);
        _this.l2 = state_1.getScalar(l2);
        return _this;
    }
    L1L2.prototype.apply = function (x) {
        var _this = this;
        return tfjs_core_1.tidy(function () {
            var regularization = tfjs_core_1.zeros([1]);
            if (_this.hasL1) {
                regularization = tfjs_core_1.add(regularization, tfjs_core_1.sum(tfc.mul(_this.l1, tfjs_core_1.abs(x))));
            }
            if (_this.hasL2) {
                regularization =
                    tfjs_core_1.add(regularization, tfjs_core_1.sum(tfc.mul(_this.l2, K.square(x))));
            }
            return regularization.asScalar();
        });
    };
    L1L2.prototype.getConfig = function () {
        return { 'l1': this.l1.dataSync()[0], 'l2': this.l2.dataSync()[0] };
    };
    L1L2.fromConfig = function (cls, config) {
        return new cls({ l1: config.l1, l2: config.l2 });
    };
    L1L2.className = 'L1L2';
    return L1L2;
}(Regularizer));
exports.L1L2 = L1L2;
tfjs_core_1.serialization.registerClass(L1L2);
function l1(config) {
    return new L1L2({ l1: config != null ? config.l1 : null, l2: 0 });
}
exports.l1 = l1;
function l2(config) {
    return new L1L2({ l2: config != null ? config.l2 : null, l1: 0 });
}
exports.l2 = l2;
exports.REGULARIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP = {
    'l1l2': 'L1L2'
};
function serializeRegularizer(constraint) {
    return generic_utils_1.serializeKerasObject(constraint);
}
exports.serializeRegularizer = serializeRegularizer;
function deserializeRegularizer(config, customObjects) {
    if (customObjects === void 0) { customObjects = {}; }
    return generic_utils_1.deserializeKerasObject(config, tfjs_core_1.serialization.SerializationMap.getMap().classNameMap, customObjects, 'regularizer');
}
exports.deserializeRegularizer = deserializeRegularizer;
function getRegularizer(identifier) {
    if (identifier == null) {
        return null;
    }
    if (typeof identifier === 'string') {
        var className = identifier in exports.REGULARIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP ?
            exports.REGULARIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP[identifier] :
            identifier;
        var config = { className: className, config: {} };
        return deserializeRegularizer(config);
    }
    else if (identifier instanceof Regularizer) {
        return identifier;
    }
    else {
        return deserializeRegularizer(identifier);
    }
}
exports.getRegularizer = getRegularizer;
//# sourceMappingURL=regularizers.js.map