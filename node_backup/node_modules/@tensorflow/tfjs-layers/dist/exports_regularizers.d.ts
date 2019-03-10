import { L1Config, L1L2Config, L2Config, Regularizer } from './regularizers';
export declare function l1l2(config?: L1L2Config): Regularizer;
export declare function l1(config?: L1Config): Regularizer;
export declare function l2(config?: L2Config): Regularizer;
