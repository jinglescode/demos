"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_layer_1 = require("./engine/input_layer");
var training_1 = require("./engine/training");
var models_1 = require("./models");
var base_callbacks_1 = require("./base_callbacks");
function model(config) {
    return new training_1.Model(config);
}
exports.model = model;
function sequential(config) {
    return new models_1.Sequential(config);
}
exports.sequential = sequential;
function loadModel(pathOrIOHandler, strict) {
    if (strict === void 0) { strict = true; }
    return models_1.loadModelInternal(pathOrIOHandler, strict);
}
exports.loadModel = loadModel;
function input(config) {
    return input_layer_1.Input(config);
}
exports.input = input;
function registerCallbackConstructor(verbosityLevel, callbackConstructor) {
    base_callbacks_1.CallbackConstructorRegistry.registerCallbackConstructor(verbosityLevel, callbackConstructor);
}
exports.registerCallbackConstructor = registerCallbackConstructor;
//# sourceMappingURL=exports.js.map