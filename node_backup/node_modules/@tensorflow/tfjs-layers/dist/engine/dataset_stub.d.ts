import * as tfc from '@tensorflow/tfjs-core';
import { TensorContainer } from '@tensorflow/tfjs-core/dist/tensor_types';
import { Shape } from '../types';
export declare abstract class LazyIterator<T> {
    abstract next(): Promise<IteratorResult<T>>;
}
export declare abstract class Dataset<T extends TensorContainer> {
    abstract iterator(): Promise<LazyIterator<T>>;
}
export interface FakeDatasetConfig {
    xShape: Shape | {
        [name: string]: Shape;
    };
    yShape: Shape | {
        [name: string]: Shape;
    };
    batchSize: number;
    numBatches: number;
}
export declare type TensorMap = {
    [name: string]: tfc.Tensor;
};
export declare type TensorOrTensorMap = tfc.Tensor | TensorMap;
export declare class FakeNumericDataset extends Dataset<[TensorOrTensorMap, TensorOrTensorMap]> {
    readonly config: FakeDatasetConfig;
    constructor(config: FakeDatasetConfig);
    iterator(): Promise<LazyIterator<[TensorOrTensorMap, TensorOrTensorMap]>>;
}
