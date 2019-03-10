import { DataType, serialization, Tensor } from '@tensorflow/tfjs-core';
import { Kwargs, Shape } from '../types';
import { Layer, SymbolicTensor, DisposeResult } from './topology';
export interface InputLayerConfig {
    inputShape?: Shape;
    batchSize?: number;
    batchInputShape?: Shape;
    dtype?: DataType;
    sparse?: boolean;
    name?: string;
}
export declare class InputLayer extends Layer {
    static readonly className: string;
    sparse: boolean;
    constructor(config: InputLayerConfig);
    apply(inputs: Tensor | Tensor[] | SymbolicTensor | SymbolicTensor[], kwargs?: Kwargs): Tensor | Tensor[] | SymbolicTensor;
    dispose(): DisposeResult;
    getConfig(): serialization.ConfigDict;
}
export interface InputConfig {
    shape?: Shape;
    batchShape?: Shape;
    name?: string;
    dtype?: DataType;
    sparse?: boolean;
}
export declare function Input(config: InputConfig): SymbolicTensor;
