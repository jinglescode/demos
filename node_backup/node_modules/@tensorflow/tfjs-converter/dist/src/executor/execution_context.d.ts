import { Tensor } from '@tensorflow/tfjs-core';
import { NamedTensorsMap, TensorArrayMap } from '../data/types';
import { TensorArray } from './tensor_array';
export interface ExecutionContextInfo {
    id: number;
    frameName: string;
    iterationId: number;
}
export declare class ExecutionContext {
    readonly weightMap: NamedTensorsMap;
    readonly tensorArrayMap: TensorArrayMap;
    private rootContext;
    private contexts;
    private lastId;
    private _currentContextIds;
    constructor(weightMap: NamedTensorsMap, tensorArrayMap: TensorArrayMap);
    private newFrame(id, frameName);
    currentContext: ExecutionContextInfo[];
    readonly currentContextId: string;
    readonly currentContextIds: string[];
    private generateCurrentContextIds();
    private contextIdforContexts(contexts);
    enterFrame(frameId: string): void;
    exitFrame(): void;
    nextIteration(): void;
    getWeight(name: string): Tensor[];
    addTensorArray(tensorArray: TensorArray): void;
    getTensorArray(id: number): TensorArray;
}
