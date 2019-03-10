import { Constraint, MaxNormConfig, MinMaxNormConfig, UnitNormConfig } from './constraints';
export declare function maxNorm(config: MaxNormConfig): Constraint;
export declare function unitNorm(config: UnitNormConfig): Constraint;
export declare function nonNeg(): Constraint;
export declare function minMaxNorm(config: MinMaxNormConfig): Constraint;
