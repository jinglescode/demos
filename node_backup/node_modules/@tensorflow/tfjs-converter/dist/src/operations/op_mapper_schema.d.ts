export declare const json: {
    '$schema': string;
    'definitions': {
        'Category': {
            'enum': string[];
            'type': string;
        };
        'OpMapper': {
            'properties': {
                'category': {
                    '$ref': string;
                };
                'dlOpName': {
                    'type': string;
                };
                'params': {
                    'items': {
                        '$ref': string;
                    };
                    'type': string;
                };
                'tfOpName': {
                    'type': string;
                };
                'unsupportedParams': {
                    'items': {
                        'type': string;
                    };
                    'type': string;
                };
            };
            'type': string;
        };
        'ParamMapper': {
            'properties': {
                'converter': {
                    'type': string;
                };
                'defaultValue': {
                    'anyOf': ({
                        'items': {
                            'type': string;
                        };
                        'type': string;
                    } | {
                        'type': string[];
                        items?: undefined;
                    })[];
                };
                'dlParamName': {
                    'type': string;
                };
                'notSupported': {
                    'type': string;
                };
                'tfInputIndex': {
                    'type': string;
                };
                'tfInputParamLength': {
                    'type': string;
                };
                'tfParamName': {
                    'type': string;
                };
                'tfParamNameDeprecated': {
                    'type': string;
                };
                'type': {
                    '$ref': string;
                };
            };
            'type': string;
        };
        'ParamTypes': {
            'enum': string[];
            'type': string;
        };
    };
    'items': {
        '$ref': string;
    };
    'type': string;
};
