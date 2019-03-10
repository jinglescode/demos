"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = [
    {
        'tfOpName': 'PlaceholderWithDefault',
        'dlOpName': 'placeholder',
        'category': 'graph',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'default', 'type': 'tensor' },
            { 'tfParamName': 'shape', 'dlParamName': 'shape', 'type': 'shape' },
            { 'tfParamName': 'dtype', 'dlParamName': 'dtype', 'type': 'dtype' }
        ]
    },
    {
        'tfOpName': 'Placeholder',
        'dlOpName': 'placeholder',
        'category': 'graph',
        'params': [
            { 'tfParamName': 'shape', 'dlParamName': 'shape', 'type': 'shape' },
            { 'tfParamName': 'dtype', 'dlParamName': 'dtype', 'type': 'dtype' }
        ]
    },
    { 'tfOpName': 'Const', 'dlOpName': 'const', 'category': 'graph' }, {
        'tfOpName': 'Identity',
        'dlOpName': 'identity',
        'category': 'graph',
        'params': [{ 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' }]
    },
    {
        'tfOpName': 'Snapshot',
        'dlOpName': 'snapshot',
        'category': 'graph',
        'params': [{ 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' }]
    },
    {
        'tfOpName': 'Rank',
        'dlOpName': 'rank',
        'category': 'graph',
        'params': [{ 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' }]
    },
    {
        'tfOpName': 'Size',
        'dlOpName': 'size',
        'category': 'graph',
        'params': [{ 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' }]
    },
    {
        'tfOpName': 'Shape',
        'dlOpName': 'shape',
        'category': 'graph',
        'params': [{ 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' }]
    },
    {
        'tfOpName': 'ShapeN',
        'dlOpName': 'shapeN',
        'category': 'graph',
        'params': [{
                'tfInputIndex': 0,
                'tfInputParamLength': 0,
                'dlParamName': 'x',
                'type': 'tensors'
            }]
    },
    {
        'tfOpName': 'Print',
        'dlOpName': 'print',
        'category': 'graph',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' }, {
                'tfInputIndex': 1,
                'tfInputParamLength': 1,
                'dlParamName': 'data',
                'type': 'tensors'
            },
            { 'tfParamName': 'message', 'dlParamName': 'message', 'type': 'string' }, {
                'tfParamName': 'first_n',
                'dlParamName': 'firstN',
                'type': 'number',
                'notSupprted': true
            },
            {
                'tfParamName': 'summarize',
                'dlParamName': 'summarize',
                'type': 'number',
                'defaultValue': 3
            }
        ]
    },
    { 'tfOpName': 'NoOp', 'dlOpName': 'noop', 'category': 'graph', 'params': [] }, {
        'tfOpName': 'StopGradient',
        'dlOpName': 'stopGradient',
        'category': 'graph',
        'params': [{ 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' }]
    },
    {
        'tfOpName': 'FakeQuantWithMinMaxVars',
        'dlOpName': 'fakeQuantWithMinMaxVars',
        'category': 'graph',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' },
            { 'tfParamName': 'min', 'dlParamName': 'min', 'type': 'number' },
            { 'tfParamName': 'max', 'dlParamName': 'max', 'type': 'number' }
        ]
    }
];
//# sourceMappingURL=graph.js.map