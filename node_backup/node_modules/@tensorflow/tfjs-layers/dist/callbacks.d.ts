import { BaseCallback } from './base_callbacks';
import { Container } from './engine/container';
import { Model } from './engine/training';
export declare abstract class Callback extends BaseCallback {
    model: Model;
    setModel(model: Container): void;
}
