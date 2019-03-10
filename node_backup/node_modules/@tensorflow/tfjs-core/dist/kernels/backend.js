"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataStorage = (function () {
    function DataStorage(dataMover) {
        this.dataMover = dataMover;
        this.data = new WeakMap();
    }
    DataStorage.prototype.get = function (dataId) {
        if (!this.data.has(dataId)) {
            this.dataMover.moveData(dataId);
        }
        return this.data.get(dataId);
    };
    DataStorage.prototype.set = function (dataId, value) {
        this.data.set(dataId, value);
    };
    DataStorage.prototype.has = function (dataId) {
        return this.data.has(dataId);
    };
    DataStorage.prototype.delete = function (dataId) {
        return this.data.delete(dataId);
    };
    return DataStorage;
}());
exports.DataStorage = DataStorage;
//# sourceMappingURL=backend.js.map