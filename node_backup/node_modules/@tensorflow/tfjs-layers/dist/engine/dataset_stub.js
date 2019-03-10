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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tfc = require("@tensorflow/tfjs-core");
var LazyIterator = (function () {
    function LazyIterator() {
    }
    return LazyIterator;
}());
exports.LazyIterator = LazyIterator;
var Dataset = (function () {
    function Dataset() {
    }
    return Dataset;
}());
exports.Dataset = Dataset;
function mergeBatchSizeAndShape(batchSize, shape) {
    if (Array.isArray(shape)) {
        return [batchSize].concat(shape);
    }
    else {
        var output = {};
        for (var name_1 in shape) {
            output[name_1] = [batchSize].concat(shape[name_1]);
        }
        return output;
    }
}
function generateRandomTensorContainer(shape) {
    var output;
    if (Array.isArray(shape)) {
        output = tfc.randomNormal(shape);
    }
    else {
        output = {};
        for (var name_2 in shape) {
            output[name_2] = tfc.randomNormal(shape[name_2]);
        }
    }
    return output;
}
var FakeNumericIterator = (function (_super) {
    __extends(FakeNumericIterator, _super);
    function FakeNumericIterator(config) {
        var _this = _super.call(this) || this;
        _this.xBatchShape = mergeBatchSizeAndShape(config.batchSize, config.xShape);
        _this.yBatchShape = mergeBatchSizeAndShape(config.batchSize, config.yShape);
        _this.numBatches = config.numBatches;
        _this.batchCount = 0;
        return _this;
    }
    FakeNumericIterator.prototype.next = function () {
        return __awaiter(this, void 0, void 0, function () {
            var done;
            return __generator(this, function (_a) {
                done = ++this.batchCount > this.numBatches;
                return [2, {
                        done: done,
                        value: done ? null :
                            [
                                generateRandomTensorContainer(this.xBatchShape),
                                generateRandomTensorContainer(this.yBatchShape)
                            ]
                    }];
            });
        });
    };
    return FakeNumericIterator;
}(LazyIterator));
var FakeNumericDataset = (function (_super) {
    __extends(FakeNumericDataset, _super);
    function FakeNumericDataset(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        tfc.util.assert(config.batchSize > 0 && Number.isInteger(config.batchSize), "batchSize must be a positive integer, but got " + config.batchSize);
        tfc.util.assert(config.numBatches > 0 && Number.isInteger(config.numBatches), "numBatches must be positive integer, but got " + config.numBatches);
        return _this;
    }
    FakeNumericDataset.prototype.iterator = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new FakeNumericIterator(this.config)];
            });
        });
    };
    return FakeNumericDataset;
}(Dataset));
exports.FakeNumericDataset = FakeNumericDataset;
//# sourceMappingURL=dataset_stub.js.map