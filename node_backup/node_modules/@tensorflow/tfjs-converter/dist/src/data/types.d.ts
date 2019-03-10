import { DataType, Tensor } from '@tensorflow/tfjs-core';
import { TensorArray } from '../executor/tensor_array';
export declare type NamedTensorMap = {
    [key: string]: Tensor;
};
export declare type NamedTensorsMap = {
    [key: string]: Tensor[];
};
export declare type TensorArrayMap = {
    [key: number]: TensorArray;
};
export interface TensorInfo {
    name: string;
    shape?: number[];
    dtype: DataType;
}
