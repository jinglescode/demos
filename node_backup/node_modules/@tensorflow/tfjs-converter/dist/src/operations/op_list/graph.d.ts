export declare const json: ({
    'tfOpName': string;
    'dlOpName': string;
    'category': string;
    params?: undefined;
} | {
    'tfOpName': string;
    'dlOpName': string;
    'category': string;
    'params': ({
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        tfInputParamLength?: undefined;
        tfParamName?: undefined;
        notSupprted?: undefined;
        defaultValue?: undefined;
    } | {
        'tfInputIndex': number;
        'tfInputParamLength': number;
        'dlParamName': string;
        'type': string;
        tfParamName?: undefined;
        notSupprted?: undefined;
        defaultValue?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        tfInputIndex?: undefined;
        tfInputParamLength?: undefined;
        notSupprted?: undefined;
        defaultValue?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        'notSupprted': boolean;
        tfInputIndex?: undefined;
        tfInputParamLength?: undefined;
        defaultValue?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        'defaultValue': number;
        tfInputIndex?: undefined;
        tfInputParamLength?: undefined;
        notSupprted?: undefined;
    })[];
})[];
