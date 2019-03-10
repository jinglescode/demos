"use strict";
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
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var tensor_array_1 = require("../../executor/tensor_array");
var utils_1 = require("./utils");
function executeOp(node, tensorMap, context) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, pred, data_1, inputName, frameId, data, tensor, input, size, dtype, elementShape, dynamicSize, clearAfterRead, identicalElementShapes, name_1, tensorArray, id, index, writeTensor, writeTensorArray, readId, readIndex, readTensorArray, gatherId, gatherIndices, gatherDtype, gatherTensorArray, scatterId, scatterIndices, scatterTensor, scatterTensorArray, concatId, concatTensorArray, concatDtype, splitId, splitTensor, lengths, splitTensorArray, sizeId, sizeTensorArray, closeId, closeTensorArray;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = node.op;
                    switch (_a) {
                        case 'loopCond': return [3, 1];
                        case 'switch': return [3, 2];
                        case 'merge': return [3, 4];
                        case 'enter': return [3, 5];
                        case 'exit': return [3, 6];
                        case 'nextIteration': return [3, 7];
                        case 'tensorArray': return [3, 8];
                        case 'tensorArrayWrite': return [3, 9];
                        case 'tensorArrayRead': return [3, 10];
                        case 'tensorArrayGather': return [3, 11];
                        case 'tensorArrayScatter': return [3, 12];
                        case 'tensorArrayConcat': return [3, 13];
                        case 'tensorArraySplit': return [3, 14];
                        case 'tensorArraySize': return [3, 15];
                        case 'tensorArrayClose': return [3, 16];
                    }
                    return [3, 17];
                case 1: return [2, [utils_1.getParamValue('pred', node, tensorMap, context)]];
                case 2:
                    pred = utils_1.getParamValue('pred', node, tensorMap, context);
                    data_1 = utils_1.getParamValue('data', node, tensorMap, context);
                    return [4, pred.data()];
                case 3: return [2, (_b.sent())[0] ? [undefined, data_1] : [data_1, undefined]];
                case 4:
                    inputName = node.inputNames.find(function (name) { return utils_1.getTensor(name, tensorMap, context) !== undefined; });
                    return [2, inputName ? [utils_1.getTensor(inputName, tensorMap, context)] : undefined];
                case 5:
                    frameId = utils_1.getParamValue('frameName', node, tensorMap, context);
                    data = utils_1.getParamValue('tensor', node, tensorMap, context);
                    context.enterFrame(frameId);
                    return [2, [data]];
                case 6:
                    tensor = utils_1.getParamValue('tensor', node, tensorMap, context);
                    context.exitFrame();
                    return [2, [tensor]];
                case 7:
                    input = utils_1.getParamValue('tensor', node, tensorMap, context);
                    context.nextIteration();
                    return [2, [input]];
                case 8:
                    size = utils_1.getParamValue('size', node, tensorMap, context);
                    dtype = utils_1.getParamValue('dtype', node, tensorMap, context);
                    elementShape = utils_1.getParamValue('elementShape', node, tensorMap, context);
                    dynamicSize = utils_1.getParamValue('dynamicSize', node, tensorMap, context);
                    clearAfterRead = utils_1.getParamValue('clearAfterRead', node, tensorMap, context);
                    identicalElementShapes = utils_1.getParamValue('identicalElementShapes', node, tensorMap, context);
                    name_1 = utils_1.getParamValue('name', node, tensorMap, context);
                    tensorArray = new tensor_array_1.TensorArray(name_1, dtype, size, elementShape, identicalElementShapes, dynamicSize, clearAfterRead);
                    context.addTensorArray(tensorArray);
                    return [2, [tfjs_core_1.scalar(tensorArray.id), tfjs_core_1.scalar(1.0)]];
                case 9:
                    id = utils_1.getParamValue('tensorArrayId', node, tensorMap, context);
                    index = utils_1.getParamValue('index', node, tensorMap, context);
                    writeTensor = utils_1.getParamValue('tensor', node, tensorMap, context);
                    writeTensorArray = context.getTensorArray(id);
                    writeTensorArray.write(index, writeTensor);
                    return [2, [tfjs_core_1.scalar(1.0)]];
                case 10:
                    readId = utils_1.getParamValue('tensorArrayId', node, tensorMap, context);
                    readIndex = utils_1.getParamValue('index', node, tensorMap, context);
                    readTensorArray = context.getTensorArray(readId);
                    return [2, [readTensorArray.read(readIndex)]];
                case 11:
                    gatherId = utils_1.getParamValue('tensorArrayId', node, tensorMap, context);
                    gatherIndices = utils_1.getParamValue('indices', node, tensorMap, context);
                    gatherDtype = utils_1.getParamValue('dtype', node, tensorMap, context);
                    gatherTensorArray = context.getTensorArray(gatherId);
                    return [2, [gatherTensorArray.gather(gatherIndices, gatherDtype)]];
                case 12:
                    scatterId = utils_1.getParamValue('tensorArrayId', node, tensorMap, context);
                    scatterIndices = utils_1.getParamValue('indices', node, tensorMap, context);
                    scatterTensor = utils_1.getParamValue('tensor', node, tensorMap, context);
                    scatterTensorArray = context.getTensorArray(scatterId);
                    scatterTensorArray.scatter(scatterIndices, scatterTensor);
                    return [2, [tfjs_core_1.scalar(1.0)]];
                case 13:
                    concatId = utils_1.getParamValue('tensorArrayId', node, tensorMap, context);
                    concatTensorArray = context.getTensorArray(concatId);
                    concatDtype = utils_1.getParamValue('dtype', node, tensorMap, context);
                    return [2, [concatTensorArray.concat(concatDtype)]];
                case 14:
                    splitId = utils_1.getParamValue('tensorArrayId', node, tensorMap, context);
                    splitTensor = utils_1.getParamValue('tensor', node, tensorMap, context);
                    lengths = utils_1.getParamValue('lengths', node, tensorMap, context);
                    splitTensorArray = context.getTensorArray(splitId);
                    splitTensorArray.split(lengths, splitTensor);
                    return [2, [tfjs_core_1.scalar(1.0)]];
                case 15:
                    sizeId = utils_1.getParamValue('tensorArrayId', node, tensorMap, context);
                    sizeTensorArray = context.getTensorArray(sizeId);
                    return [2, [tfjs_core_1.scalar(sizeTensorArray.size(), 'int32')]];
                case 16:
                    closeId = utils_1.getParamValue('tensorArrayId', node, tensorMap, context);
                    closeTensorArray = context.getTensorArray(closeId);
                    closeTensorArray.clearAndClose();
                    return [2, []];
                case 17: throw TypeError("Node type " + node.op + " is not implemented");
            }
        });
    });
}
exports.executeOp = executeOp;
exports.CATEGORY = 'control';
//# sourceMappingURL=control_executor.js.map