(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vega = {})));
}(this, (function (exports) { 'use strict';

  function domCanvas(w, h) {
    if (typeof document !== 'undefined' && document.createElement) {
      var c = document.createElement('canvas');
      if (c && c.getContext) {
        c.width = w;
        c.height = h;
        return c;
      }
    }
    return null;
  }

  function domImage() {
    return typeof Image !== 'undefined' ? Image : null;
  }

  var NodeCanvas;

  ['canvas', 'canvas-prebuilt'].some(function(libName) {
    try {
      NodeCanvas = require(libName);
      if (typeof NodeCanvas !== 'function') {
        NodeCanvas = null;
      }
    } catch (error) {
      NodeCanvas = null;
    }
    return NodeCanvas;
  });

  function nodeCanvas(w, h) {
    if (NodeCanvas) {
      try {
        return new NodeCanvas(w, h);
      } catch (e) {
        // do nothing, return null on error
      }
    }
    return null;
  }

  function nodeImage() {
    return (NodeCanvas && NodeCanvas.Image) || null;
  }

  function canvas(w, h) {
    return domCanvas(w, h) || nodeCanvas(w, h) || null;
  }

  function image() {
    return domImage() || nodeImage() || null;
  }

  exports.canvas = canvas;
  exports.image = image;
  exports.domCanvas = domCanvas;
  exports.nodeCanvas = nodeCanvas;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
