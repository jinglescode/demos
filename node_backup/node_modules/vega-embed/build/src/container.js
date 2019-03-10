import * as tslib_1 from "tslib";
import embed from './embed';
/**
 * Create a promise to an HTML Div element with an embedded Vega-Lite or Vega visualization.
 * The element has a value property with the view. By default all actions except for the editor action are disabled.
 *
 * The main use case is in [Observable](https://observablehq.com/).
 */
export function container(spec, opt) {
    if (opt === void 0) { opt = {}; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var div, actions;
        return tslib_1.__generator(this, function (_a) {
            div = document.createElement('div');
            actions = opt.actions === true || opt.actions === false
                ? opt.actions
                : tslib_1.__assign({ export: true, source: false, compiled: true, editor: true }, (opt.actions || {}));
            return [2 /*return*/, embed(div, spec, tslib_1.__assign({ actions: actions, defaultStyle: true, runAsync: true }, (opt || {}))).then(function (result) {
                    div.value = result.view;
                    return div;
                })];
        });
    });
}
//# sourceMappingURL=container.js.map