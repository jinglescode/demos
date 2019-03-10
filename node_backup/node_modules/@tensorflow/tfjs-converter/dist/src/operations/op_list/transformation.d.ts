export declare const json: ({
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
} | {
    'tfOpName': string;
    'dlOpName': string;
    'category': string;
    'params': ({
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        tfParamNameDeprecated?: undefined;
    } | {
        'tfInputIndex': number;
        'tfParamNameDeprecated': string;
        'dlParamName': string;
        'type': string;
    })[];
} | {
    'tfOpName': string;
    'dlOpName': string;
    'category': string;
    'params': ({
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        tfParamName?: undefined;
        defaultValue?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        'defaultValue': number;
        tfInputIndex?: undefined;
    })[];
} | {
    'tfOpName': string;
    'dlOpName': string;
    'category': string;
    'params': ({
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        defaultValue?: undefined;
    } | {
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        'defaultValue': number;
    })[];
} | {
    'tfOpName': string;
    'dlOpName': string;
    'category': string;
    'params': ({
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        tfParamName?: undefined;
        tfParamNameDeprecated?: undefined;
    } | {
        'tfParamName': string;
        'tfParamNameDeprecated': string;
        'dlParamName': string;
        'type': string;
        tfInputIndex?: undefined;
    })[];
})[];
