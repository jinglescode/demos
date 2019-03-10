import * as d3 from 'd3-selection';
import { isString } from 'vega-util';
import pkg from '../package.json';
import { container } from './container';
import embed, { vega, vl } from './embed';
import { isURL } from './util';
/**
 * Returns true of the object is an HTML element.
 */
function isElement(obj) {
    return obj instanceof d3.selection || typeof HTMLElement === 'object'
        ? obj instanceof HTMLElement // DOM2
        : obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
}
var wrapper = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length > 1 && ((isString(args[0]) && !isURL(args[0])) || isElement(args[0]) || args.length === 3)) {
        return embed(args[0], args[1], args[2]);
    }
    return container(args[0], args[1]);
};
wrapper.vl = vl;
wrapper.container = container;
wrapper.embed = embed;
wrapper.vega = vega;
wrapper.default = embed;
wrapper.version = pkg.version;
export default wrapper;
//# sourceMappingURL=index.js.map