import { Scalar, Tensor } from '@tensorflow/tfjs-core';
export declare type Shape = number[];
export declare type HasShape = {
    shape: Shape;
};
export declare type LossOrMetricFn = (yTrue: Tensor, yPred: Tensor) => Tensor;
export declare type RegularizerFn = () => Scalar;
export declare type RnnStepFunction = (inputs: Tensor, states: Tensor[]) => [Tensor, Tensor[]];
export declare type NamedTensorMap = {
    [name: string]: Tensor;
};
export declare type JsonValue = boolean | number | string | null | JsonArray | JsonDict;
export interface JsonDict {
    [key: string]: JsonValue;
}
export interface JsonArray extends Array<JsonValue> {
}
export declare type Kwargs = {
    [key: string]: any;
};
