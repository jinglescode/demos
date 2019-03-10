import { Scalar, serialization, Tensor } from '@tensorflow/tfjs-core';
import { JsonDict, Kwargs, NamedTensorMap, Shape } from '../types';
import { LayerVariable } from '../variables';
import { DisposeResult, Layer, Node, SymbolicTensor } from './topology';
export declare function loadWeightsFromJson(weightsJSON: JsonDict, layers: Layer[], skipMismatch?: boolean): void;
export declare function loadWeightsFromNamedTensorMap(weights: NamedTensorMap, layers: Layer[], strict?: boolean): void;
export interface ContainerConfig {
    inputs: SymbolicTensor | SymbolicTensor[];
    outputs: SymbolicTensor | SymbolicTensor[];
    name?: string;
}
export declare abstract class Container extends Layer {
    inputs: SymbolicTensor[];
    outputs: SymbolicTensor[];
    inputLayers: Layer[];
    inputLayersNodeIndices: number[];
    inputLayersTensorIndices: number[];
    outputLayers: Layer[];
    outputLayersNodeIndices: number[];
    outputLayersTensorIndices: number[];
    layers: Layer[];
    layersByDepth: {
        [depth: string]: Layer[];
    };
    nodesByDepth: {
        [depth: string]: Node[];
    };
    containerNodes: Set<string>;
    inputNames: string[];
    outputNames: string[];
    feedInputShapes: Shape[];
    protected internalInputShapes: Shape[];
    protected internalOutputShapes: Shape[];
    protected feedInputNames: string[];
    protected feedOutputNames: string[];
    constructor(config: ContainerConfig);
    protected assertNotDisposed(): void;
    dispose(): DisposeResult;
    readonly trainableWeights: LayerVariable[];
    readonly nonTrainableWeights: LayerVariable[];
    readonly weights: LayerVariable[];
    loadWeights(weightsJSON: JsonDict | NamedTensorMap, skipMismatch?: boolean, isNamedTensorMap?: boolean, strict?: boolean): void;
    private updatedConfig();
    toJSON(unused?: any, returnString?: boolean): string | JsonDict;
    call(inputs: Tensor | Tensor[], kwargs: Kwargs): Tensor | Tensor[];
    computeMask(inputs: Tensor | Tensor[], mask?: Tensor | Tensor[]): Tensor | Tensor[];
    computeOutputShape(inputShape: Shape | Shape[]): Shape | Shape[];
    protected runInternalGraph(inputs: Tensor[], masks?: Tensor[]): [Tensor[], Tensor[], Shape[]];
    private buildNodeConversionMap(layers);
    getLayer(name?: string, index?: number): Layer;
    calculateLosses(): Scalar[];
    getConfig(): serialization.ConfigDict;
    static fromConfig<T extends serialization.Serializable>(cls: serialization.SerializableConstructor<T>, config: serialization.ConfigDict): T;
    readonly stateful: boolean;
    resetStates(): void;
}
