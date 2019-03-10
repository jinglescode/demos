import { DataType, Tensor } from '@tensorflow/tfjs-core';
export interface TensorWithState {
    tensor?: Tensor;
    written?: boolean;
    read?: boolean;
    cleared?: boolean;
}
export declare class TensorArray {
    readonly name: string;
    readonly dtype: DataType;
    private maxSize;
    private elementShape;
    readonly identicalElementShapes: boolean;
    readonly dynamicSize: boolean;
    readonly clearAfterRead: boolean;
    private static nextId;
    private tensors;
    private closed_;
    readonly id: number;
    constructor(name: string, dtype: DataType, maxSize: number, elementShape: number[], identicalElementShapes: boolean, dynamicSize: boolean, clearAfterRead: boolean);
    readonly closed: boolean;
    clearAndClose(): void;
    size(): number;
    read(index: number): Tensor;
    readMany(indices: number[]): Tensor[];
    write(index: number, tensor: Tensor): void;
    writeMany(indices: number[], tensors: Tensor[]): void;
    gather(indices?: number[], dtype?: DataType): Tensor;
    concat(dtype?: DataType): Tensor;
    scatter(indices: number[], tensor: Tensor): void;
    split(length: number[], tensor: Tensor): void;
    private assertShapesMatch(shapeA, shapeB, errorMessagePrefix?);
    private arraysEqual(n1, n2);
}
