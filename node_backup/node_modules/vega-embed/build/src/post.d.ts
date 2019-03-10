import { Renderers } from 'vega';
import { Config, Mode } from './types';
/**
 * Open editor url in a new window, and pass a message.
 */
export declare function post(window: Window, url: string, data: {
    config?: Config;
    mode: Mode;
    renderer?: Renderers;
    spec: string;
}): void;
