import { DataType, Scalar, serialization, Tensor } from '@tensorflow/tfjs-core';
import { Constraint } from '../constraints';
import { Initializer } from '../initializers';
import { Regularizer } from '../regularizers';
import { Kwargs, RegularizerFn, Shape } from '../types';
import { LayerVariable } from '../variables';
export declare type Op = (x: LayerVariable) => LayerVariable;
export interface InputSpecConfig {
    dtype?: DataType;
    shape?: Shape;
    ndim?: number;
    maxNDim?: number;
    minNDim?: number;
    axes?: {
        [axis: number]: number;
    };
}
export declare class InputSpec {
    dtype?: DataType;
    shape?: Shape;
    ndim?: number;
    maxNDim?: number;
    minNDim?: number;
    axes?: {
        [axis: number]: number;
    };
    constructor(config: InputSpecConfig);
}
export declare class SymbolicTensor {
    readonly dtype: DataType;
    readonly shape: Shape;
    sourceLayer: Layer;
    readonly inputs: SymbolicTensor[];
    readonly callArgs: Kwargs;
    readonly outputTensorIndex: number;
    readonly id: number;
    readonly name: string;
    readonly originalName?: string;
    readonly rank: number;
    nodeIndex: number;
    tensorIndex: number;
    constructor(dtype: DataType, shape: Shape, sourceLayer: Layer, inputs: SymbolicTensor[], callArgs: Kwargs, name?: string, outputTensorIndex?: number);
}
export interface NodeConfig {
    outboundLayer: Layer;
    inboundLayers: Layer[];
    nodeIndices: number[];
    tensorIndices: number[];
    inputTensors: SymbolicTensor[];
    outputTensors: SymbolicTensor[];
    inputMasks: Tensor[];
    outputMasks: Tensor[];
    inputShapes: Shape | Shape[];
    outputShapes: Shape | Shape[];
}
export interface DisposeResult {
    refCountAfterDispose: number;
    numDisposedVariables: number;
}
export declare class Node {
    callArgs: Kwargs;
    outboundLayer: Layer;
    inboundLayers: Layer[];
    nodeIndices: number[];
    tensorIndices: number[];
    inputTensors: SymbolicTensor[];
    outputTensors: SymbolicTensor[];
    inputMasks: Tensor[];
    outputMasks: Tensor[];
    inputShapes: Shape | Shape[];
    outputShapes: Shape | Shape[];
    readonly id: number;
    constructor(config: NodeConfig, callArgs?: Kwargs);
    getConfig(): serialization.ConfigDict;
}
export interface LayerConfig {
    inputShape?: Shape;
    batchInputShape?: Shape;
    batchSize?: number;
    dtype?: DataType;
    name?: string;
    trainable?: boolean;
    updatable?: boolean;
    weights?: Tensor[];
    inputDType?: DataType;
}
export declare type CallHook = (inputs: Tensor | Tensor[], kwargs: Kwargs) => void;
export declare abstract class Layer extends serialization.Serializable {
    name: string;
    inputSpec: InputSpec[];
    supportsMasking: boolean;
    trainable: boolean;
    updatable: boolean;
    batchInputShape: Shape;
    dtype: DataType;
    initialWeights: Tensor[];
    inboundNodes: Node[];
    outboundNodes: Node[];
    activityRegularizer: Regularizer;
    protected _trainableWeights: LayerVariable[];
    private _nonTrainableWeights;
    private _losses;
    private _updates;
    private _built;
    private _callHook;
    private _addedWeightNames;
    readonly id: number;
    protected _stateful: boolean;
    protected _refCount: number | null;
    constructor(config: LayerConfig);
    protected static nodeKey(layer: Layer, nodeIndex: number): string;
    private getNodeAtIndex(nodeIndex, attrName);
    getInputAt(nodeIndex: number): SymbolicTensor | SymbolicTensor[];
    getOutputAt(nodeIndex: number): SymbolicTensor | SymbolicTensor[];
    readonly input: SymbolicTensor | SymbolicTensor[];
    readonly output: SymbolicTensor | SymbolicTensor[];
    readonly losses: RegularizerFn[];
    calculateLosses(): Scalar[];
    readonly updates: Tensor[];
    built: boolean;
    trainableWeights: LayerVariable[];
    nonTrainableWeights: LayerVariable[];
    readonly weights: LayerVariable[];
    readonly stateful: boolean;
    resetStates(): void;
    protected assertInputCompatibility(inputs: Tensor | Tensor[] | SymbolicTensor | SymbolicTensor[]): void;
    call(inputs: Tensor | Tensor[], kwargs: Kwargs): Tensor | Tensor[];
    protected invokeCallHook(inputs: Tensor | Tensor[], kwargs: Kwargs): void;
    setCallHook(callHook: CallHook): void;
    clearCallHook(): void;
    apply(inputs: Tensor | Tensor[] | SymbolicTensor | SymbolicTensor[], kwargs?: Kwargs): Tensor | Tensor[] | SymbolicTensor | SymbolicTensor[];
    protected warnOnIncompatibleInputShape(inputShape: Shape): void;
    readonly outputShape: Shape | Shape[];
    countParams(): number;
    build(inputShape: Shape | Shape[]): void;
    getWeights(trainableOnly?: boolean): Tensor[];
    setWeights(weights: Tensor[]): void;
    protected addWeight(name: string, shape: Shape, dtype?: DataType, initializer?: Initializer, regularizer?: Regularizer, trainable?: boolean, constraint?: Constraint): LayerVariable;
    addLoss(losses: RegularizerFn | RegularizerFn[]): void;
    computeOutputShape(inputShape: Shape | Shape[]): Shape | Shape[];
    computeMask(inputs: Tensor | Tensor[], mask?: Tensor | Tensor[]): Tensor | Tensor[];
    private addInboundNode(inputTensors, outputTensors, inputMasks, outputMasks, inputShapes, outputShapes, kwargs?);
    getConfig(): serialization.ConfigDict;
    protected disposeWeights(): number;
    protected assertNotDisposed(): void;
    dispose(): DisposeResult;
}
export declare function getSourceInputs(tensor: SymbolicTensor, layer?: Layer, nodeIndex?: number): SymbolicTensor[];
