export declare const json: ({
    'tfOpName': string;
    'dlOpName': string;
    'category': string;
    'params': ({
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        defaultValue?: undefined;
        tfParamName?: undefined;
        notSupported?: undefined;
    } | {
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        'defaultValue': number;
        tfParamName?: undefined;
        notSupported?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        'notSupported': boolean;
        tfInputIndex?: undefined;
        defaultValue?: undefined;
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
        notSupported?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        'defaultValue': number;
        tfInputIndex?: undefined;
        notSupported?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        tfInputIndex?: undefined;
        defaultValue?: undefined;
        notSupported?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        'defaultValue': number;
        'notSupported': boolean;
        tfInputIndex?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        'notSupported': boolean;
        tfInputIndex?: undefined;
        defaultValue?: undefined;
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
        tfParamName?: undefined;
    } | {
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        'defaultValue': number;
        tfParamName?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        tfInputIndex?: undefined;
        defaultValue?: undefined;
    })[];
})[];
