"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var TensorArray = (function () {
    function TensorArray(name, dtype, maxSize, elementShape, identicalElementShapes, dynamicSize, clearAfterRead) {
        this.name = name;
        this.dtype = dtype;
        this.maxSize = maxSize;
        this.elementShape = elementShape;
        this.identicalElementShapes = identicalElementShapes;
        this.dynamicSize = dynamicSize;
        this.clearAfterRead = clearAfterRead;
        this.tensors = [];
        this.closed_ = false;
        this.id = TensorArray.nextId++;
    }
    Object.defineProperty(TensorArray.prototype, "closed", {
        get: function () {
            return this.closed_;
        },
        enumerable: true,
        configurable: true
    });
    TensorArray.prototype.clearAndClose = function () {
        this.tensors.forEach(function (tensor) { return tensor.tensor.dispose(); });
        this.tensors = [];
        this.closed_ = true;
    };
    TensorArray.prototype.size = function () {
        return this.tensors.length;
    };
    TensorArray.prototype.read = function (index) {
        if (this.closed_) {
            throw new Error("TensorArray " + this.name + " has already been closed.");
        }
        if (index < 0 || index >= this.tensors.length) {
            throw new Error("Tried to read from index " + index + ", but array size is: " + this.tensors.length);
        }
        var tensorWithState = this.tensors[index];
        if (tensorWithState.cleared) {
            throw new Error("TensorArray " + this.name + ": Could not read index " + index + " twice because it was cleared after a previous read " +
                "(perhaps try setting clear_after_read = false?).");
        }
        if (this.clearAfterRead) {
            tensorWithState.cleared = true;
        }
        tensorWithState.read = true;
        return tensorWithState.tensor;
    };
    TensorArray.prototype.readMany = function (indices) {
        var _this = this;
        return indices.map(function (index) { return _this.read(index); });
    };
    TensorArray.prototype.write = function (index, tensor) {
        if (this.closed_) {
            throw new Error("TensorArray " + this.name + " has already been closed.");
        }
        if (index < 0 || !this.dynamicSize && index >= this.maxSize) {
            throw new Error("Tried to write to index " + index + ", but array is not resizeable and size is: " + this.maxSize);
        }
        var t = this.tensors[index] || {};
        if (tensor.dtype !== this.dtype) {
            throw new Error("TensorArray " + this.name + ": Could not write to TensorArray index " + index + ",\n          because the value dtype is " + tensor.dtype + ", but TensorArray dtype is " + this.dtype + ".");
        }
        if (this.size() === 0 && this.elementShape.length === 0) {
            this.elementShape = tensor.shape;
        }
        this.assertShapesMatch(this.elementShape, tensor.shape, "TensorArray " + this.name + ": Could not write to TensorArray index " + index + ".");
        if (t && t.read) {
            throw new Error("TensorArray " + this.name + ": Could not write to TensorArray index " + index + ", because it has already been read.");
        }
        if (t && t.written) {
            throw new Error("TensorArray " + this.name + ": Could not write to TensorArray index " + index + ", because it has already been written.");
        }
        t.tensor = tensor;
        t.written = true;
        this.tensors[index] = t;
    };
    TensorArray.prototype.writeMany = function (indices, tensors) {
        var _this = this;
        if (indices.length !== tensors.length) {
            throw new Error("TensorArray " + this.name + ": could not write multiple tensors," +
                ("because the index size: " + indices.length + " is not the same as tensors size: " + tensors.length + "."));
        }
        indices.forEach(function (i, index) { return _this.write(i, tensors[index]); });
    };
    TensorArray.prototype.gather = function (indices, dtype) {
        if (!!dtype && dtype !== this.dtype) {
            throw new Error("TensorArray dtype is " + this.dtype + " but gather requested dtype " + dtype);
        }
        if (!indices) {
            indices = [];
            for (var i = 0; i < this.size(); i++) {
                indices.push(i);
            }
        }
        if (indices.length === 0) {
            return tfjs_core_1.tensor([], [0].concat(this.elementShape));
        }
        var tensors = this.readMany(indices);
        this.assertShapesMatch(this.elementShape, tensors[0].shape, 'TensorArray shape mismatch: ');
        return tfjs_core_1.stack(tensors, 0);
    };
    TensorArray.prototype.concat = function (dtype) {
        if (!!dtype && dtype !== this.dtype) {
            throw new Error("TensorArray dtype is " + this.dtype + " but concat requested dtype " + dtype);
        }
        if (this.size() === 0) {
            return tfjs_core_1.tensor([], [0].concat(this.elementShape));
        }
        var indices = [];
        for (var i = 0; i < this.size(); i++) {
            indices.push(i);
        }
        var tensors = this.readMany(indices);
        this.assertShapesMatch(this.elementShape, tensors[0].shape, "TensorArray shape mismatch: tensor array shape (" + this.elementShape + ") vs first tensor shape (" + tensors[0].shape + ")");
        return tfjs_core_1.concat(tensors, 0);
    };
    TensorArray.prototype.scatter = function (indices, tensor) {
        if (tensor.dtype !== this.dtype) {
            throw new Error("TensorArray dtype is " + this.dtype + " but tensor has dtype " + tensor.dtype);
        }
        if (indices.length !== tensor.shape[0]) {
            throw new Error("Expected len(indices) == tensor.shape[0], but saw: " + indices.length + " vs. " + tensor.shape[0]);
        }
        var maxIndex = Math.max.apply(Math, indices);
        if (!this.dynamicSize && maxIndex >= this.maxSize) {
            throw new Error("Max index must be < array size (" + maxIndex + "  vs. " + this.maxSize + ")");
        }
        this.writeMany(indices, tfjs_core_1.unstack(tensor, 0));
    };
    TensorArray.prototype.split = function (length, tensor) {
        var _this = this;
        if (tensor.dtype !== this.dtype) {
            throw new Error("TensorArray dtype is " + this.dtype + " but tensor has dtype " + tensor.dtype);
        }
        var totalLength = 0;
        var cumulativeLengths = length.map(function (len) {
            totalLength += len;
            return totalLength;
        });
        if (totalLength !== tensor.shape[0]) {
            throw new Error("Expected sum of lengths to be equal to\n          tensor.shape[0], but sum of lengths is\n        " + totalLength + ", and tensor's shape is: " + tensor.shape);
        }
        if (!this.dynamicSize && length.length !== this.maxSize) {
            throw new Error("TensorArray's size is not equal to the size of lengths (" + this.maxSize + " vs. " + length.length + "), " +
                'and the TensorArray is not marked as dynamically resizeable');
        }
        var elementPerRow = totalLength === 0 ? 0 : tensor.size / totalLength;
        var tensors = [];
        tfjs_core_1.tidy(function () {
            tensor = tensor.reshape([1, totalLength, elementPerRow]);
            for (var i = 0; i < length.length; ++i) {
                var previousLength = (i === 0) ? 0 : cumulativeLengths[i - 1];
                var indices_1 = [0, previousLength, 0];
                var sizes = [1, length[i], elementPerRow];
                tensors[i] = tfjs_core_1.slice(tensor, indices_1, sizes).reshape(_this.elementShape);
            }
            return tensors;
        });
        var indices = [];
        for (var i = 0; i < length.length; i++) {
            indices[i] = i;
        }
        this.writeMany(indices, tensors);
    };
    TensorArray.prototype.assertShapesMatch = function (shapeA, shapeB, errorMessagePrefix) {
        if (errorMessagePrefix === void 0) { errorMessagePrefix = ''; }
        tfjs_core_1.util.assert(this.arraysEqual(shapeA, shapeB), errorMessagePrefix + (" Shapes " + shapeA + " and " + shapeB + " must match"));
    };
    TensorArray.prototype.arraysEqual = function (n1, n2) {
        if (n1.length !== n2.length) {
            return false;
        }
        for (var i = 0; i < n1.length; i++) {
            if (n1[i] !== -1 && n2[i] !== -1 && n1[i] !== n2[i]) {
                return false;
            }
        }
        return true;
    };
    TensorArray.nextId = 0;
    return TensorArray;
}());
exports.TensorArray = TensorArray;
//# sourceMappingURL=tensor_array.js.map