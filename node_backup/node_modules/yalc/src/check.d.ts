export declare type CheckOptions = {
    workingDir: string;
    all?: boolean;
    commit?: boolean;
};
export declare function checkManifest(options: CheckOptions): void;
