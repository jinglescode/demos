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
var base_callbacks_1 = require("./base_callbacks");
var training_1 = require("./engine/training");
var Callback = (function (_super) {
    __extends(Callback, _super);
    function Callback() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = null;
        return _this;
    }
    Callback.prototype.setModel = function (model) {
        if (!(model instanceof training_1.Model)) {
            throw new Error('model must be a Model, not some other Container');
        }
        this.model = model;
    };
    return Callback;
}(base_callbacks_1.BaseCallback));
exports.Callback = Callback;
//# sourceMappingURL=callbacks.js.map