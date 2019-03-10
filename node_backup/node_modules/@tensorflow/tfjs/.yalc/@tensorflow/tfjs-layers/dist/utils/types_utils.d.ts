import { Tensor } from '@tensorflow/tfjs-core';
import { Shape } from '../types';
export declare function isArrayOfShapes(x: Shape | Shape[]): boolean;
export declare function normalizeShapeList(x: Shape | Shape[]): Shape[];
export declare function getExactlyOneTensor(xs: Tensor | Tensor[]): Tensor;
export declare function getExactlyOneShape(shapes: Shape | Shape[]): Shape;
