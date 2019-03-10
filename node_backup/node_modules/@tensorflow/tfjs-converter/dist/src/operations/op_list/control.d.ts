export declare const json: ({
    'tfOpName': string;
    'dlOpName': string;
    'category': string;
    'params': {
        'tfInputIndex': number;
        'tfInputParamLength': number;
        'dlParamName': string;
        'type': string;
    }[];
} | {
    'tfOpName': string;
    'dlOpName': string;
    'category': string;
    'params': ({
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        tfParamName?: undefined;
        notSupported?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        'notSupported': boolean;
        tfInputIndex?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        tfInputIndex?: undefined;
        notSupported?: undefined;
    })[];
})[];
