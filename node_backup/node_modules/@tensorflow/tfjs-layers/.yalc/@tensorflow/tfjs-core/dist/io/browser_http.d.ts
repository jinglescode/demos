import { IORouter } from './router_registry';
import { IOHandler, ModelArtifacts, SaveResult } from './types';
export declare class BrowserHTTPRequest implements IOHandler {
    protected readonly path: string | string[];
    protected readonly requestInit: RequestInit;
    readonly DEFAULT_METHOD: string;
    static readonly URL_SCHEME_REGEX: RegExp;
    constructor(path: string | string[], requestInit?: RequestInit);
    save(modelArtifacts: ModelArtifacts): Promise<SaveResult>;
    load(): Promise<ModelArtifacts>;
    private loadBinaryTopology;
    protected loadBinaryModel(): Promise<ModelArtifacts>;
    protected loadJSONModel(): Promise<ModelArtifacts>;
    private loadWeights;
}
export declare const httpRequestRouter: IORouter;
export declare function browserHTTPRequest(path: string | string[], requestInit?: RequestInit): IOHandler;
