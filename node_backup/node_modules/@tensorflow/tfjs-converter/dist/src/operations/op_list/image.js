"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = [
    {
        'tfOpName': 'ResizeBilinear',
        'dlOpName': 'resizeBilinear',
        'category': 'image',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'images', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'size', 'type': 'number[]' }, {
                'tfParamName': 'align_corners',
                'dlParamName': 'alignCorners',
                'type': 'bool'
            },
            {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'ResizeNearestNeighbor',
        'dlOpName': 'resizeNearestNeighbor',
        'category': 'image',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'images', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'size', 'type': 'number[]' }, {
                'tfParamName': 'align_corners',
                'dlParamName': 'alignCorners',
                'type': 'bool'
            },
            {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'CropAndResize',
        'dlOpName': 'cropAndResize',
        'category': 'image',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'image', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'boxes', 'type': 'tensor' },
            { 'tfInputIndex': 2, 'dlParamName': 'boxInd', 'type': 'tensor' },
            { 'tfInputIndex': 3, 'dlParamName': 'cropSize', 'type': 'number[]' },
            { 'tfParamName': 'method', 'dlParamName': 'method', 'type': 'string' }, {
                'tfParamName': 'extrapolation_value',
                'dlParamName': 'extrapolationValue',
                'type': 'number'
            }
        ]
    }
];
//# sourceMappingURL=image.js.map