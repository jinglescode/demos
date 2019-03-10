"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_layer_1 = require("./engine/input_layer");
var topology_1 = require("./engine/topology");
exports.Layer = topology_1.Layer;
var exports_1 = require("./exports");
exports.input = exports_1.input;
var advanced_activations_1 = require("./layers/advanced_activations");
var convolutional_1 = require("./layers/convolutional");
var convolutional_depthwise_1 = require("./layers/convolutional_depthwise");
var core_1 = require("./layers/core");
var embeddings_1 = require("./layers/embeddings");
var merge_1 = require("./layers/merge");
var normalization_1 = require("./layers/normalization");
var padding_1 = require("./layers/padding");
var pooling_1 = require("./layers/pooling");
var recurrent_1 = require("./layers/recurrent");
exports.RNN = recurrent_1.RNN;
exports.RNNCell = recurrent_1.RNNCell;
var wrappers_1 = require("./layers/wrappers");
function inputLayer(config) {
    return new input_layer_1.InputLayer(config);
}
exports.inputLayer = inputLayer;
function elu(config) {
    return new advanced_activations_1.ELU(config);
}
exports.elu = elu;
function reLU(config) {
    return new advanced_activations_1.ReLU(config);
}
exports.reLU = reLU;
function leakyReLU(config) {
    return new advanced_activations_1.LeakyReLU(config);
}
exports.leakyReLU = leakyReLU;
function softmax(config) {
    return new advanced_activations_1.Softmax(config);
}
exports.softmax = softmax;
function thresholdedReLU(config) {
    return new advanced_activations_1.ThresholdedReLU(config);
}
exports.thresholdedReLU = thresholdedReLU;
function conv1d(config) {
    return new convolutional_1.Conv1D(config);
}
exports.conv1d = conv1d;
function conv2d(config) {
    return new convolutional_1.Conv2D(config);
}
exports.conv2d = conv2d;
function conv2dTranspose(config) {
    return new convolutional_1.Conv2DTranspose(config);
}
exports.conv2dTranspose = conv2dTranspose;
function separableConv2d(config) {
    return new convolutional_1.SeparableConv2D(config);
}
exports.separableConv2d = separableConv2d;
function cropping2D(config) {
    return new convolutional_1.Cropping2D(config);
}
exports.cropping2D = cropping2D;
function upSampling2d(config) {
    return new convolutional_1.UpSampling2D(config);
}
exports.upSampling2d = upSampling2d;
function depthwiseConv2d(config) {
    return new convolutional_depthwise_1.DepthwiseConv2D(config);
}
exports.depthwiseConv2d = depthwiseConv2d;
function activation(config) {
    return new core_1.Activation(config);
}
exports.activation = activation;
function dense(config) {
    return new core_1.Dense(config);
}
exports.dense = dense;
function dropout(config) {
    return new core_1.Dropout(config);
}
exports.dropout = dropout;
function flatten(config) {
    return new core_1.Flatten(config);
}
exports.flatten = flatten;
function repeatVector(config) {
    return new core_1.RepeatVector(config);
}
exports.repeatVector = repeatVector;
function reshape(config) {
    return new core_1.Reshape(config);
}
exports.reshape = reshape;
function permute(config) {
    return new core_1.Permute(config);
}
exports.permute = permute;
function embedding(config) {
    return new embeddings_1.Embedding(config);
}
exports.embedding = embedding;
function add(config) {
    return new merge_1.Add(config);
}
exports.add = add;
function average(config) {
    return new merge_1.Average(config);
}
exports.average = average;
function concatenate(config) {
    return new merge_1.Concatenate(config);
}
exports.concatenate = concatenate;
function maximum(config) {
    return new merge_1.Maximum(config);
}
exports.maximum = maximum;
function minimum(config) {
    return new merge_1.Minimum(config);
}
exports.minimum = minimum;
function multiply(config) {
    return new merge_1.Multiply(config);
}
exports.multiply = multiply;
function batchNormalization(config) {
    return new normalization_1.BatchNormalization(config);
}
exports.batchNormalization = batchNormalization;
function zeroPadding2d(config) {
    return new padding_1.ZeroPadding2D(config);
}
exports.zeroPadding2d = zeroPadding2d;
function averagePooling1d(config) {
    return new pooling_1.AveragePooling1D(config);
}
exports.averagePooling1d = averagePooling1d;
function avgPool1d(config) {
    return averagePooling1d(config);
}
exports.avgPool1d = avgPool1d;
function avgPooling1d(config) {
    return averagePooling1d(config);
}
exports.avgPooling1d = avgPooling1d;
function averagePooling2d(config) {
    return new pooling_1.AveragePooling2D(config);
}
exports.averagePooling2d = averagePooling2d;
function avgPool2d(config) {
    return averagePooling2d(config);
}
exports.avgPool2d = avgPool2d;
function avgPooling2d(config) {
    return averagePooling2d(config);
}
exports.avgPooling2d = avgPooling2d;
function globalAveragePooling1d(config) {
    return new pooling_1.GlobalAveragePooling1D(config);
}
exports.globalAveragePooling1d = globalAveragePooling1d;
function globalAveragePooling2d(config) {
    return new pooling_1.GlobalAveragePooling2D(config);
}
exports.globalAveragePooling2d = globalAveragePooling2d;
function globalMaxPooling1d(config) {
    return new pooling_1.GlobalMaxPooling1D(config);
}
exports.globalMaxPooling1d = globalMaxPooling1d;
function globalMaxPooling2d(config) {
    return new pooling_1.GlobalMaxPooling2D(config);
}
exports.globalMaxPooling2d = globalMaxPooling2d;
function maxPooling1d(config) {
    return new pooling_1.MaxPooling1D(config);
}
exports.maxPooling1d = maxPooling1d;
function maxPooling2d(config) {
    return new pooling_1.MaxPooling2D(config);
}
exports.maxPooling2d = maxPooling2d;
function gru(config) {
    return new recurrent_1.GRU(config);
}
exports.gru = gru;
function gruCell(config) {
    return new recurrent_1.GRUCell(config);
}
exports.gruCell = gruCell;
function lstm(config) {
    return new recurrent_1.LSTM(config);
}
exports.lstm = lstm;
function lstmCell(config) {
    return new recurrent_1.LSTMCell(config);
}
exports.lstmCell = lstmCell;
function simpleRNN(config) {
    return new recurrent_1.SimpleRNN(config);
}
exports.simpleRNN = simpleRNN;
function simpleRNNCell(config) {
    return new recurrent_1.SimpleRNNCell(config);
}
exports.simpleRNNCell = simpleRNNCell;
function rnn(config) {
    return new recurrent_1.RNN(config);
}
exports.rnn = rnn;
function stackedRNNCells(config) {
    return new recurrent_1.StackedRNNCells(config);
}
exports.stackedRNNCells = stackedRNNCells;
function bidirectional(config) {
    return new wrappers_1.Bidirectional(config);
}
exports.bidirectional = bidirectional;
function timeDistributed(config) {
    return new wrappers_1.TimeDistributed(config);
}
exports.timeDistributed = timeDistributed;
exports.globalMaxPool1d = globalMaxPooling1d;
exports.globalMaxPool2d = globalMaxPooling2d;
exports.maxPool1d = maxPooling1d;
exports.maxPool2d = maxPooling2d;
//# sourceMappingURL=exports_layers.js.map