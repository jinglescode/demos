"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = [
    {
        'tfOpName': 'Add',
        'dlOpName': 'add',
        'category': 'arithmetic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'AddN',
        'dlOpName': 'addN',
        'category': 'arithmetic',
        'params': [{
                'tfInputIndex': 0,
                'tfInputParamLength': 0,
                'dlParamName': 'tensors',
                'type': 'tensors'
            }]
    },
    {
        'tfOpName': 'BiasAdd',
        'dlOpName': 'add',
        'category': 'arithmetic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Sub',
        'dlOpName': 'sub',
        'category': 'arithmetic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'RealDiv',
        'dlOpName': 'div',
        'category': 'arithmetic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Div',
        'dlOpName': 'div',
        'category': 'arithmetic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'FloorDiv',
        'dlOpName': 'floorDiv',
        'category': 'arithmetic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Mul',
        'dlOpName': 'mul',
        'category': 'arithmetic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Maximum',
        'dlOpName': 'maximum',
        'category': 'arithmetic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }
        ]
    },
    {
        'tfOpName': 'Minimum',
        'dlOpName': 'minimum',
        'category': 'arithmetic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }
        ]
    },
    {
        'tfOpName': 'Pow',
        'dlOpName': 'pow',
        'category': 'arithmetic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'SquaredDifference',
        'dlOpName': 'squaredDifference',
        'category': 'arithmetic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Mod',
        'dlOpName': 'mod',
        'category': 'arithmetic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'FloorMod',
        'dlOpName': 'mod',
        'category': 'arithmetic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    }
];
//# sourceMappingURL=arithmetic.js.map