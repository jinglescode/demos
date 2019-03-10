import { DataType, Scalar } from '@tensorflow/tfjs-core';
export declare function getNextUniqueTensorId(): number;
export declare function getUid(prefix?: string): string;
export declare function getScalar(value: number, dtype?: DataType): Scalar;
export declare function disposeScalarCache(): void;
