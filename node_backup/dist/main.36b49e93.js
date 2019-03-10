// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({18:[function(require,module,exports) {
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],14:[function(require,module,exports) {
var core = require('../../modules/_core');
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

},{"../../modules/_core":18}],7:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":14}],4:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
class CSVIO {
	/**
  * Load a CSV file
  * 
  * @param {String} url url of the file to load
  */
	static async load(csvURL) {
		let response = await fetch(csvURL);
		let csvText = await response.text();
		let csvData = CSVIO.parse(csvText);
		return csvData;
	}

	/**
  * Parse a CSV content
  * 
  * @param {String} allText text to parse
  */
	static parse(allText) {
		var allTextLines = allText.split(/\r\n|\n/);
		var headers = allTextLines[0].split(',');
		var lines = [];

		for (var i = 1; i < allTextLines.length; i++) {
			var data = allTextLines[i].split(',');
			if (data.length == headers.length) {

				var tarr = {};
				for (var j = 0; j < headers.length; j++) {
					tarr[headers[j]] = data[j];
				}
				lines.push(tarr);
			}
		}
		return lines;
	}
}

exports.default = CSVIO;
},{}],24:[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],25:[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],22:[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":24,"./_defined":25}],26:[function(require,module,exports) {
module.exports = true;

},{}],35:[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],46:[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],36:[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":46}],55:[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],47:[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":55}],54:[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],41:[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":54}],52:[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":55,"./_global":35}],48:[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":41,"./_fails":54,"./_dom-create":52}],49:[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":55}],38:[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":47,"./_ie8-dom-define":48,"./_to-primitive":49,"./_descriptors":41}],39:[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],29:[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":38,"./_property-desc":39,"./_descriptors":41}],37:[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],27:[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":35,"./_core":18,"./_ctx":36,"./_hide":29,"./_has":37}],28:[function(require,module,exports) {
module.exports = require('./_hide');

},{"./_hide":29}],30:[function(require,module,exports) {
module.exports = {};

},{}],70:[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],68:[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":70}],64:[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":68,"./_defined":25}],60:[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":24}],69:[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":24}],65:[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":64,"./_to-length":60,"./_to-absolute-index":69}],44:[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":18,"./_global":35,"./_library":26}],45:[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],42:[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":44,"./_uid":45}],57:[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":37,"./_to-iobject":64,"./_array-includes":65,"./_shared-key":42}],51:[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],56:[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":57,"./_enum-bug-keys":51}],50:[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":38,"./_an-object":47,"./_object-keys":56,"./_descriptors":41}],53:[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":35}],40:[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":47,"./_object-dps":50,"./_enum-bug-keys":51,"./_shared-key":42,"./_dom-create":52,"./_html":53}],34:[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":44,"./_uid":45,"./_global":35}],32:[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":38,"./_has":37,"./_wks":34}],31:[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":40,"./_property-desc":39,"./_set-to-string-tag":32,"./_hide":29,"./_wks":34}],43:[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":25}],33:[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":37,"./_to-object":43,"./_shared-key":42}],23:[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":26,"./_export":27,"./_redefine":28,"./_hide":29,"./_iterators":30,"./_iter-create":31,"./_set-to-string-tag":32,"./_object-gpo":33,"./_wks":34}],19:[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":22,"./_iter-define":23}],58:[function(require,module,exports) {
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":47}],59:[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":30,"./_wks":34}],61:[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":38,"./_property-desc":39}],67:[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":70,"./_wks":34}],62:[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":67,"./_wks":34,"./_iterators":30,"./_core":18}],63:[function(require,module,exports) {
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":34}],20:[function(require,module,exports) {
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":36,"./_export":27,"./_to-object":43,"./_iter-call":58,"./_is-array-iter":59,"./_to-length":60,"./_create-property":61,"./core.get-iterator-method":62,"./_iter-detect":63}],16:[function(require,module,exports) {
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/es6.string.iterator":19,"../../modules/es6.array.from":20,"../../modules/_core":18}],12:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":16}],5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _csvIo = require('./csv-io.js');

var _csvIo2 = _interopRequireDefault(_csvIo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TimeSeries {

	////////////////////////////////////////////////////////////////////////
	//		Predict
	////////////////////////////////////////////////////////////////////////

	static predict(model, timeSeriesPredict, timeWindowWidth) {
		console.assert(timeSeriesPredict.length === timeWindowWidth);
		const inputsTensor = TimeSeries.toTensor(timeSeriesPredict, timeWindowWidth);

		let predictionsTensor = model.predict(inputsTensor);

		let predictedTimeSeries = TimeSeries.fromTensor(predictionsTensor);

		return predictedTimeSeries;
	}

	static generatePredictOneAhead(model, actualTimeSeries, timeWindowWidth) {
		var newTimeSeries = actualTimeSeries.slice(0, timeWindowWidth);

		for (let timeStep = 0; timeStep < actualTimeSeries.length - timeWindowWidth; timeStep++) {
			let inputTimeSeries = TimeSeries.sliceTimeWindow(actualTimeSeries, timeStep, timeWindowWidth);
			let predictedTimeSeries = TimeSeries.predict(model, inputTimeSeries, timeWindowWidth);
			let valueOneAhead = predictedTimeSeries[0];
			newTimeSeries.push(valueOneAhead);
		}
		console.assert(actualTimeSeries.length === newTimeSeries.length);
		return newTimeSeries;
	}

	static generatePredictFullAhead(model, actualTimeSeries, timeWindowWidth) {
		var newTimeSeries = actualTimeSeries.slice(0, timeWindowWidth);

		for (let timeStep = 0; timeStep < actualTimeSeries.length - timeWindowWidth; timeStep++) {
			let inputTimeSeries = TimeSeries.sliceTimeWindow(newTimeSeries, timeStep, timeWindowWidth);
			let predictedTimeSeries = TimeSeries.predict(model, inputTimeSeries, timeWindowWidth);
			let valueOneAhead = predictedTimeSeries[0];
			newTimeSeries.push(valueOneAhead);
		}
		console.assert(actualTimeSeries.length === newTimeSeries.length);
		return newTimeSeries;
	}

	////////////////////////////////////////////////////////////////////////
	//		Processing
	////////////////////////////////////////////////////////////////////////

	static slice(timeSeries, begin, end) {
		return timeSeries.slice(begin, end);
	}

	static sliceTimeWindow(timeSeries, begin, timeWindowWidth) {
		return timeSeries.slice(begin, begin + timeWindowWidth);
	}

	////////////////////////////////////////////////////////////////////////
	//		Transform
	////////////////////////////////////////////////////////////////////////


	static normalizeTransform(timeSeries) {
		// compute minValue, maxValue
		let minValue = +Infinity;
		let maxValue = -Infinity;
		for (let value of timeSeries) {
			minValue = Math.min(minValue, value);
			maxValue = Math.max(maxValue, value);
		}

		// normalize the values ```newValue = (value - min)/(max - min)```
		let transformedTimeSeries = [];
		for (let timeIndex = 0; timeIndex < timeSeries.length; timeIndex++) {
			transformedTimeSeries[timeIndex] = (timeSeries[timeIndex] - minValue) / (maxValue - minValue);
		}

		// build the inverseFunction
		let inverseFunction = function (timeSeries) {
			// denormalize the values ```newValue = (value*(max-min) + min)```
			let inversedTimeSeries = [];
			for (let timeIndex = 0; timeIndex < timeSeries.length; timeIndex++) {
				inversedTimeSeries[timeIndex] = timeSeries[timeIndex] * (maxValue - minValue) + minValue;
			}
			return inversedTimeSeries;
		};

		// return the transformedTimeSeries and inverseFunction
		return { transformedTimeSeries, inverseFunction };
	}
	static standardizeTransform(timeSeries) {
		// compute mean
		let mean = 0;
		for (let timeIndex = 0; timeIndex < timeSeries.length; timeIndex++) {
			mean += timeSeries[timeIndex];
		}
		mean /= timeSeries.length;

		// compute standard deviation
		let standardDeviation = 0;
		for (let timeIndex = 0; timeIndex < timeSeries.length; timeIndex++) {
			standardDeviation += Math.pow(timeSeries[timeIndex] - mean, 2);
		}
		standardDeviation = Math.sqrt(standardDeviation / timeSeries.length);

		// standardize the values - value = (value - mean)/standardDeviation
		let transformedTimeSeries = [];
		for (let timeIndex = 0; timeIndex < timeSeries.length; timeIndex++) {
			transformedTimeSeries[timeIndex] = (timeSeries[timeIndex] - mean) / standardDeviation;
		}

		// build the inverseFunction
		let inverseFunction = function (timeSeries) {
			// de-standardize the values ```newValue = (value*standardDeviation + mean)```
			let inversedTimeSeries = [];
			for (let timeIndex = 0; timeIndex < timeSeries.length; timeIndex++) {
				inversedTimeSeries[timeIndex] = timeSeries[timeIndex] * standardDeviation + mean;
			}
			return inversedTimeSeries;
		};

		// return the transformedTimeSeries and inverseFunction
		return { transformedTimeSeries, inverseFunction };
	}

	////////////////////////////////////////////////////////////////////////
	//		Convert to Tensor
	////////////////////////////////////////////////////////////////////////

	static fromTensor(tensor) {
		let timeSeries = (0, _from2.default)(tensor.dataSync());
		return timeSeries;
	}

	static toTensor(timeSeries, timeWindowWidth) {
		var xsValues = [];
		for (let timeIndex = 0; timeIndex < timeSeries.length - timeWindowWidth + 1; timeIndex++) {
			// build input
			var input = timeSeries.slice(timeIndex, timeIndex + timeWindowWidth).map(value => [value]);
			// add input to xsValue
			xsValues.push(input);
		}
		// create the tensors for xsValues
		var xsTensor = tf.tensor3d(xsValues);

		return xsTensor;
	}

	/**
  * convert a timeSeries into a tensor
  * 
  * @param {Number[]} timeSeries the timeseries to convert
  * @param {Number} timeWindowWidth the width of the time window
  */
	static buildLearningTensor(timeSeries, timeWindowWidth) {
		var xsValues = TimeSeries.slice(timeSeries, 0, timeSeries.length - timeWindowWidth);
		var xs = TimeSeries.toTensor(xsValues, timeWindowWidth);

		var ysValues = TimeSeries.slice(timeSeries, timeWindowWidth, timeSeries.length);
		var ys = TimeSeries.toTensor(ysValues, timeWindowWidth);

		console.assert(xsValues.length === ysValues.length);

		return { xs, ys };
	}

	////////////////////////////////////////////////////////////////////////
	//		Loading files
	////////////////////////////////////////////////////////////////////////


	/**
  * Load a CSV file
  * 
  * @param {String} url url of the file to load
  */
	static async loadFromCSV(csvURL) {
		let csvData = await _csvIo2.default.load(csvURL);
		let timeSeries = csvData.map(row => parseFloat(row['Close']));
		return timeSeries;
	}

	////////////////////////////////////////////////////////////////////////
	//		Generation of 'artificial' time series
	////////////////////////////////////////////////////////////////////////


	/**
  * Generate a cosinus timeSerie
  * 
  * @param {Number} length length of the timeserie to generate
  * @param {Number} period the period of the cosinus to generate
  */
	static generateCos(length, period) {
		let timeSeries = [];
		for (let i = 0; i < length; i++) {
			let angle = i * Math.PI * 2 / period;
			let value = Math.cos(angle);
			// let value = Math.abs(Math.cos(angle/2))
			timeSeries.push(value);
		}
		return timeSeries;
	}

	static generateLine(length) {
		let timeSeries = [];
		for (let i = 0; i < length; i++) {
			let value = i;
			timeSeries.push(value);
		}
		return timeSeries;
	}

	////////////////////////////////////////////////////////////////////////
	//		Display
	////////////////////////////////////////////////////////////////////////

	/**
 * Display historical data from csvData
 */
	static displayTfvis(tfvisContainer, timeSeries, seriesName) {
		seriesName = seriesName || 'Time Series';
		TimeSeries.displayTfvisMultiple(tfvisContainer, [{
			timeSeries: timeSeries,
			name: seriesName
		}]);
	}

	/**
 * Display historical data from csvData
 */
	static displayTfvisMultiple(tfvisContainer, multipleTimeSeries) {
		const surface = tfvis.visor().surface(tfvisContainer);

		// convert value before displaying them
		let seriesValues = [];
		let seriesNames = [];
		for (let item of multipleTimeSeries) {
			let seriesValue = item.timeSeries.map((value, recordIndex) => new Object({ x: recordIndex, y: value }));
			let seriesName = item.name;
			seriesValues.push(seriesValue);
			seriesNames.push(seriesName);
		}

		// render value with tfvis
		tfvis.render.linechart({
			values: seriesValues,
			series: seriesNames
		}, surface, {
			zoomToFit: true,
			xLabel: 'timeStep',
			yLabel: 'value'
		});
	}
}

exports.default = TimeSeries;
},{"babel-runtime/core-js/array/from":12,"./csv-io.js":4}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Model {
	////////////////////////////////////////////////////////////////////////
	//		Create a model
	////////////////////////////////////////////////////////////////////////

	static createLSTM(timeWindowWidth, options) {
		// handle options values
		options = options || {};
		let learningRate = options.learningRate !== undefined ? options.learningRate : 0.05;

		// build model and its layers
		const tfModel = tf.sequential();

		// tfModel.add(tf.layers.dense({
		// 	inputShape: [timeWindowWidth, 1],
		// 	units: 40,
		// 	activation: 'relu',
		// }));

		tfModel.add(tf.layers.lstm({
			inputShape: [timeWindowWidth, 1],
			units: 10,
			// activation: 'relu',
			returnSequences: true
		}));
		// tfModel.add(tf.layers.lstm({
		// 	units: 1,
		// 	activation: 'sigmoid',
		// 	returnSequences: true
		// }));

		tfModel.add(tf.layers.dense({
			units: 10
			// activation: 'sigmoid',
		}));

		// tfModel.add(tf.layers.timeDistributed({
		// 	layer: tf.layers.dense({
		// 		units: 20
		// 	})
		// }));
		// tfModel.add(tf.layers.dropout({rate:0.1}));
		// tfModel.add(tf.layers.activation({
		// 	activation: 'softmax'
		// }));
		tfModel.add(tf.layers.dense({
			units: 1
			// activation: 'sigmoid',
		}));
		// tfModel.add(tf.layers.activation({
		// 	activation: 'softmax'
		// }));


		// create the optimized
		// const optimizer = tf.train.sgd(0.1)
		const optimizer = tf.train.adam(learningRate);

		// compile the tfModel
		tfModel.compile({
			optimizer: optimizer,
			loss: tf.losses.meanSquaredError
		});
		// return the just built tfModel
		return tfModel;
	}

	static createDenseOnly(timeWindowWidth, options) {
		// handle options values
		options = options || {};
		let learningRate = options.learningRate !== undefined ? options.learningRate : 0.05;

		// build model and its layers
		const tfModel = tf.sequential();

		tfModel.add(tf.layers.dense({
			inputShape: [timeWindowWidth, 1],
			units: 50
			// activation: 'relu',
		}));
		// tfModel.add(tf.layers.dropout({rate:0.1}));
		// tfModel.add(tf.layers.dense({
		// 	units: 20,
		// 	// activation: 'relu',
		// }));
		// tfModel.add(tf.layers.dropout({rate:0.1}));
		tfModel.add(tf.layers.dense({
			units: 1
			// activation: 'relu',
		}));

		// create the optimized
		const optimizer = tf.train.adam(learningRate);

		// compile the tfModel
		tfModel.compile({
			optimizer: optimizer,
			loss: tf.losses.meanSquaredError
		});
		// return the just built tfModel
		return tfModel;
	}

	////////////////////////////////////////////////////////////////////////
	//		Train a model
	////////////////////////////////////////////////////////////////////////


	static async train(tfModel, xs, ys, options) {
		// handle options values
		options = options || {};
		let epochs = options.epochs !== undefined ? options.epochs : 30;
		let validationSplit = options.validationSplit !== undefined ? options.validationSplit : 0.3;

		// compute batchSize
		let batchSize = options.batchSize;
		if (batchSize === undefined) {
			batchSize = Math.floor(xs.shape[0] * 0.3);
			batchSize = Math.max(batchSize, 4);
			batchSize = Math.min(batchSize, 64);
		}

		// Use tfjs-vis - TODO make that as an options from the caller. too hardcoded for here
		const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
		const container = { name: 'model.fit metrics', tab: 'Training' };
		const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);
		const tfjsApplyWorkaroundCanvasSize = () => {
			// Working around a bug in tfvis - it keeps increasing the size of the canvas for no reason
			// - so here im forcing them back
			(0, _from2.default)(document.querySelectorAll('.vega-embed canvas')).forEach(canvasEl => {
				canvasEl.style.height = '200px';
			});
		};

		// acutally start learning
		let response = await tfModel.fit(xs, ys, {
			batchSize,
			validationSplit,
			epochs,
			callbacks: {
				onBatchEnd: async (batch, logs) => {
					fitCallbacks.onBatchEnd.apply(this, [batch, logs]);
					tfjsApplyWorkaroundCanvasSize();
				},
				onEpochEnd: (epoch, log) => {
					fitCallbacks.onEpochEnd.apply(this, [epoch, log]);
					tfjsApplyWorkaroundCanvasSize();
				}
			}
		});

		return response;
	}
}

exports.default = Model;
},{"babel-runtime/core-js/array/from":12}],2:[function(require,module,exports) {
'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _csvIo = require('./csv-io.js');

var _csvIo2 = _interopRequireDefault(_csvIo);

var _timeseries = require('./timeseries.js');

var _timeseries2 = _interopRequireDefault(_timeseries);

var _model = require('./model.js');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async function () {
	let timeWindowWidth = 10;

	// let timeSeries = await TimeSeries.loadFromCSV('../data/GOOG-nov072018-dec072018.csv')
	// let timeSeries = await TimeSeries.loadFromCSV('../data/AAPL-dec072017-dec072018.csv')
	let timeSeries = _timeseries2.default.generateCos(100, 6);
	// let timeSeries = TimeSeries.generateLine(100)

	_timeseries2.default.displayTfvis({ name: 'original data', tab: 'Time Series' }, timeSeries);

	// let { transformedTimeSeries, inverseFunction } = TimeSeries.standardizeTransform(timeSeries)
	// let { transformedTimeSeries, inverseFunction } = TimeSeries.normalizeTransform(timeSeries)
	// TimeSeries.displayTfvis({name: 'Standardized data', tab: 'Time Series'}, transformedTimeSeries)
	// timeSeries = transformedTimeSeries
	// let inversedTimeSeries = inverseFunction(transformedTimeSeries)
	// TimeSeries.displayTfvis({name: 'Inversed data', tab: 'Time Series'}, inversedTimeSeries)


	////////////////////////////////////////////////////////////////////////
	//		Build Model
	////////////////////////////////////////////////////////////////////////

	// let tfModel = Model.createDenseOnly(timeWindowWidth, {
	// 	learningRate: 0.05
	// })
	let tfModel = _model2.default.createLSTM(timeWindowWidth, {
		learningRate: 0.01
	});

	// basic usage of tfvis
	const surface = { name: 'Model Summary', tab: 'Model' };
	tfvis.show.modelSummary(surface, tfModel);

	////////////////////////////////////////////////////////////////////////
	//		learn
	////////////////////////////////////////////////////////////////////////

	let { xs, ys } = _timeseries2.default.buildLearningTensor(timeSeries, timeWindowWidth);
	xs.print();
	ys.print();

	console.log('xs', xs);
	console.log('ys', ys);

	// train the tfModel
	let learningResponse = await _model2.default.train(tfModel, xs, ys, {
		epochs: 50,
		// batchSize: 100,
		validationSplit: 0.15
	});

	// display learningResponse.params
	let { container, label, drawArea } = tfvis.visor().surface({ name: 'Training Data', tab: 'Training' });
	drawArea.innerHTML = '<pre>' + (0, _stringify2.default)(learningResponse.params, null, '\t') + '</pre>';

	////////////////////////////////////////////////////////////////////////
	//		Predict
	////////////////////////////////////////////////////////////////////////

	let predictTimeSeries = _timeseries2.default.sliceTimeWindow(timeSeries, 0, timeWindowWidth);
	let actualTimeSeries = _timeseries2.default.sliceTimeWindow(timeSeries, 1, timeWindowWidth);

	let predictedTimeSeries = _timeseries2.default.predict(tfModel, predictTimeSeries, timeWindowWidth);

	console.log('predictedTimeSeries', predictedTimeSeries);
	console.log('actualTimeSeries', actualTimeSeries);

	////////////////////////////////////////////////////////////////////////
	//		Display result
	////////////////////////////////////////////////////////////////////////

	_timeseries2.default.displayTfvisMultiple({ name: 'predicted timeWindow', tab: 'Predicting' }, [{ timeSeries: actualTimeSeries, name: 'actual' }, { timeSeries: predictedTimeSeries, name: 'predicted' }]);

	let predictedOneAhead = _timeseries2.default.generatePredictOneAhead(tfModel, timeSeries, timeWindowWidth);
	_timeseries2.default.displayTfvisMultiple({ name: 'One Ahead Prediction', tab: 'Predicting' }, [{ timeSeries: timeSeries, name: 'Actual' }, { timeSeries: predictedOneAhead, name: 'One Ahead' }]);

	let predictedFullAhead = _timeseries2.default.generatePredictFullAhead(tfModel, timeSeries, timeWindowWidth);
	_timeseries2.default.displayTfvisMultiple({ name: 'Full Ahead Prediction', tab: 'Predicting' }, [{ timeSeries: timeSeries, name: 'Actual' }, { timeSeries: predictedFullAhead, name: 'Full Ahead' }]);
})();
},{"babel-runtime/core-js/json/stringify":7,"./csv-io.js":4,"./timeseries.js":5,"./model.js":6}]},{},[2], null)
//# sourceMappingURL=/main.36b49e93.map