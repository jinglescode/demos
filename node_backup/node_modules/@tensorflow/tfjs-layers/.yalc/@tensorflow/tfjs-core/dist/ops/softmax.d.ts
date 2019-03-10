import { Tensor } from '../tensor';
import { TensorLike } from '../types';
declare function softmax_<T extends Tensor>(logits: T | TensorLike, dim?: number): T;
export declare const softmax: typeof softmax_;
export {};
