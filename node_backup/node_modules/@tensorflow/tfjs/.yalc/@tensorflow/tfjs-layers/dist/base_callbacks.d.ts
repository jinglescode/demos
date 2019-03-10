import { Tensor } from '@tensorflow/tfjs-core';
import { Container } from './engine/container';
import { Logs, UnresolvedLogs } from './logs';
export declare type Params = {
    [key: string]: number | string | boolean | number[] | string[] | boolean[];
};
export declare type YieldEveryOptions = 'auto' | 'batch' | 'epoch' | 'never';
export declare abstract class BaseCallback {
    validationData: Tensor | Tensor[];
    params: Params;
    setParams(params: Params): void;
    onEpochBegin(epoch: number, logs?: UnresolvedLogs): Promise<void>;
    onEpochEnd(epoch: number, logs?: UnresolvedLogs): Promise<void>;
    onBatchBegin(batch: number, logs?: UnresolvedLogs): Promise<void>;
    onBatchEnd(batch: number, logs?: UnresolvedLogs): Promise<void>;
    onTrainBegin(logs?: UnresolvedLogs): Promise<void>;
    onTrainEnd(logs?: UnresolvedLogs): Promise<void>;
    setModel(model: Container): void;
}
export declare class CallbackList {
    callbacks: BaseCallback[];
    queueLength: number;
    constructor(callbacks?: BaseCallback[], queueLength?: number);
    append(callback: BaseCallback): void;
    setParams(params: Params): void;
    setModel(model: Container): void;
    onEpochBegin(epoch: number, logs?: UnresolvedLogs): Promise<void>;
    onEpochEnd(epoch: number, logs?: UnresolvedLogs): Promise<void>;
    onBatchBegin(batch: number, logs?: UnresolvedLogs): Promise<void>;
    onBatchEnd(batch: number, logs?: UnresolvedLogs): Promise<void>;
    onTrainBegin(logs?: UnresolvedLogs): Promise<void>;
    onTrainEnd(logs?: UnresolvedLogs): Promise<void>;
}
export declare class ModelTrainingYielder {
    static readonly SKIP_FIRST_BATCHES: number;
    static readonly DECISION_BATCH_COUNT: number;
    static readonly THRESHOLD_MILLIS: number;
    private yieldEvery;
    private batchCount;
    private lastYieldBatchCount;
    private batchStartMillis;
    private batchDurationsMillis;
    private autoYieldEveryBatches;
    constructor(yieldEvery: YieldEveryOptions);
    private resolveOneTensorInLogs(logs);
    maybeYieldOnBatch(logs: UnresolvedLogs): Promise<void>;
    maybeYieldOnEpoch(): Promise<void>;
}
export declare class BaseLogger extends BaseCallback {
    private seen;
    private totals;
    private autoYielder;
    private yieldEvery;
    constructor(yieldEvery?: YieldEveryOptions);
    onTrainBegin(logs?: UnresolvedLogs): Promise<void>;
    onEpochBegin(epoch: number): Promise<void>;
    onBatchEnd(batch: number, logs?: UnresolvedLogs): Promise<void>;
    onEpochEnd(epoch: number, logs?: UnresolvedLogs): Promise<void>;
}
export declare class History extends BaseCallback {
    epoch: number[];
    history: {
        [key: string]: Array<number | Tensor>;
    };
    onTrainBegin(logs?: UnresolvedLogs): Promise<void>;
    onEpochEnd(epoch: number, logs?: UnresolvedLogs): Promise<void>;
    syncData(): Promise<void>;
}
export interface CustomCallbackConfig {
    onTrainBegin?: (logs?: Logs) => Promise<void>;
    onTrainEnd?: (logs?: Logs) => Promise<void>;
    onEpochBegin?: (epoch: number, logs?: Logs) => Promise<void>;
    onEpochEnd?: (epoch: number, logs?: Logs) => Promise<void>;
    onBatchBegin?: (batch: number, logs?: Logs) => Promise<void>;
    onBatchEnd?: (batch: number, logs?: Logs) => Promise<void>;
}
export declare class CustomCallback extends BaseCallback {
    protected readonly trainBegin: (logs?: Logs) => Promise<void>;
    protected readonly trainEnd: (logs?: Logs) => Promise<void>;
    protected readonly epochBegin: (epoch: number, logs?: Logs) => Promise<void>;
    protected readonly epochEnd: (epoch: number, logs?: Logs) => Promise<void>;
    protected readonly batchBegin: (batch: number, logs?: Logs) => Promise<void>;
    protected readonly batchEnd: (batch: number, logs?: Logs) => Promise<void>;
    constructor(config: CustomCallbackConfig);
    onEpochBegin(epoch: number, logs?: UnresolvedLogs): Promise<void>;
    onEpochEnd(epoch: number, logs?: UnresolvedLogs): Promise<void>;
    onBatchBegin(batch: number, logs?: UnresolvedLogs): Promise<void>;
    onBatchEnd(batch: number, logs?: UnresolvedLogs): Promise<void>;
    onTrainBegin(logs?: UnresolvedLogs): Promise<void>;
    onTrainEnd(logs?: UnresolvedLogs): Promise<void>;
}
export declare function standardizeCallbacks(callbacks: BaseCallback | BaseCallback[] | CustomCallbackConfig | CustomCallbackConfig[]): BaseCallback[];
export declare type BaseCallbackConstructor = {
    new (): BaseCallback;
};
export declare class CallbackConstructorRegistry {
    private static constructors;
    private constructor();
    static registerCallbackConstructor(verbosityLevel: number, callbackConstructor: BaseCallbackConstructor): void;
    private static checkForDuplicate(callbackConstructor);
    protected static clear(): void;
    static createCallbacks(verbosityLevel: number): BaseCallback[];
}
