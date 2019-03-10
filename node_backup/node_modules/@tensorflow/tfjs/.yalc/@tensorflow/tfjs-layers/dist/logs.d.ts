import { Scalar } from '@tensorflow/tfjs-core';
export declare type UnresolvedLogs = {
    [key: string]: number | Scalar;
};
export declare function resolveScalarsInLogs(logs: UnresolvedLogs): Promise<void>;
export declare function disposeTensorsInLogs(logs: UnresolvedLogs): void;
export declare type Logs = {
    [key: string]: number;
};
