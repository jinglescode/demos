(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vega-util'), require('d3-dsv'), require('topojson-client'), require('d3-time-format')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vega-util', 'd3-dsv', 'topojson-client', 'd3-time-format'], factory) :
  (factory((global.vega = {}),global.vega,global.d3,global.topojson,global.d3));
}(this, (function (exports,vegaUtil,d3Dsv,topojsonClient,d3TimeFormat) { 'use strict';

  // Matches absolute URLs with optional protocol
  //   https://...    file://...    //...
  var protocol_re = /^([A-Za-z]+:)?\/\//;

  // Special treatment in node.js for the file: protocol
  var fileProtocol = 'file://';

  /**
   * Creates a new loader instance that provides methods for requesting files
   * from either the network or disk, and for sanitizing request URIs.
   * @param {object} [options] - Optional default loading options to use.
   * @return {object} - A new loader instance.
   */
  function loader(options) {
    return {
      options: options || {},
      sanitize: sanitize,
      load: load,
      file: file,
      http: http
    };
  }

  /**
   * Load an external resource, typically either from the web or from the local
   * filesystem. This function uses {@link sanitize} to first sanitize the uri,
   * then calls either {@link http} (for web requests) or {@link file} (for
   * filesystem loading).
   * @param {string} uri - The resource indicator (e.g., URL or filename).
   * @param {object} [options] - Optional loading options. These options will
   *   override any existing default options.
   * @return {Promise} - A promise that resolves to the loaded content.
   */
  function load(uri, options) {
    var loader = this;
    return loader.sanitize(uri, options)
      .then(function(opt) {
        var url = opt.href;
        return opt.localFile
          ? loader.file(url)
          : loader.http(url, options);
      });
  }

  /**
   * URI sanitizer function.
   * @param {string} uri - The uri (url or filename) to sanity check.
   * @param {object} options - An options hash.
   * @return {Promise} - A promise that resolves to an object containing
   *  sanitized uri data, or rejects it the input uri is deemed invalid.
   *  The properties of the resolved object are assumed to be
   *  valid attributes for an HTML 'a' tag. The sanitized uri *must* be
   *  provided by the 'href' property of the returned object.
   */
  function sanitize(uri, options) {
    options = vegaUtil.extend({}, this.options, options);

    return new Promise(function(accept, reject) {
      var result = {href: null},
          isFile, hasProtocol, loadFile, base;

      if (uri == null || typeof uri !== 'string') {
        reject('Sanitize failure, invalid URI: ' + vegaUtil.stringValue(uri));
        return;
      }

      hasProtocol = protocol_re.test(uri);

      // if relative url (no protocol/host), prepend baseURL
      if ((base = options.baseURL) && !hasProtocol) {
        // Ensure that there is a slash between the baseURL (e.g. hostname) and url
        if (!startsWith(uri, '/') && base[base.length-1] !== '/') {
          uri = '/' + uri;
        }
        uri = base + uri;
      }

      // should we load from file system?
      loadFile = (isFile = startsWith(uri, fileProtocol))
        || options.mode === 'file'
        || options.mode !== 'http' && !hasProtocol && fs();

      if (isFile) {
        // strip file protocol
        uri = uri.slice(fileProtocol.length);
      } else if (startsWith(uri, '//')) {
        if (options.defaultProtocol === 'file') {
          // if is file, strip protocol and set loadFile flag
          uri = uri.slice(2);
          loadFile = true;
        } else {
          // if relative protocol (starts with '//'), prepend default protocol
          uri = (options.defaultProtocol || 'http') + ':' + uri;
        }
      }

      // set non-enumerable mode flag to indicate local file load
      Object.defineProperty(result, 'localFile', {value: !!loadFile});

      // set uri
      result.href = uri;

      // set default result target, if specified
      if (options.target) {
        result.target = options.target + '';
      }

      // return
      accept(result);
    });
  }

  /**
   * HTTP request loader.
   * @param {string} url - The url to request.
   * @param {object} options - An options hash.
   * @return {Promise} - A promise that resolves to the file contents.
   */
  function http(url, options) {
    return request(url, vegaUtil.extend({}, this.options.http, options))
      .then(function(response) {
        if (!response.ok) throw response.status + '' + response.statusText;
        return response.text();
      });
  }

  /**
   * File system loader.
   * @param {string} filename - The file system path to load.
   * @return {Promise} - A promise that resolves to the file contents.
   */
  function file(filename) {
    return new Promise(function(accept, reject) {
      var f = fs();
      f ? f.readFile(filename, function(error, data) {
            if (error) reject(error);
            else accept(data);
          })
        : reject('No file system access for ' + filename);
    });
  }

  function request(url, init) {
    var f = typeof fetch === 'function' ? fetch : require('node-fetch');
    return f ? f(url, init) : Promise.reject('No fetch method available.');
  }

  function fs() {
    var fs = typeof require === 'function' && require('fs');
    return fs && vegaUtil.isFunction(fs.readFile) ? fs : null;
  }

  function startsWith(string, query) {
    return string == null ? false : string.lastIndexOf(query, 0) === 0;
  }

  var typeParsers = {
    boolean: vegaUtil.toBoolean,
    integer: vegaUtil.toNumber,
    number:  vegaUtil.toNumber,
    date:    vegaUtil.toDate,
    string:  vegaUtil.toString,
    unknown: vegaUtil.identity
  };

  var typeTests = [
    isBoolean,
    isInteger,
    isNumber,
    isDate
  ];

  var typeList = [
    'boolean',
    'integer',
    'number',
    'date'
  ];

  function inferType(values, field) {
    if (!values || !values.length) return 'unknown';

    var value, i, j, t = 0,
        n = values.length,
        m = typeTests.length,
        a = typeTests.map(function(_, i) { return i + 1; });

    for (i=0, n=values.length; i<n; ++i) {
      value = field ? values[i][field] : values[i];
      for (j=0; j<m; ++j) {
        if (a[j] && isValid(value) && !typeTests[j](value)) {
          a[j] = 0;
          ++t;
          if (t === typeTests.length) return 'string';
        }
      }
    }

    t = a.reduce(function(u, v) { return u === 0 ? v : u; }, 0) - 1;
    return typeList[t];
  }

  function inferTypes(data, fields) {
    return fields.reduce(function(types, field) {
      types[field] = inferType(data, field);
      return types;
    }, {});
  }

  // -- Type Checks ----

  function isValid(_) {
    return _ != null && _ === _;
  }

  function isBoolean(_) {
    return _ === 'true' || _ === 'false' || _ === true || _ === false;
  }

  function isDate(_) {
    return !isNaN(Date.parse(_));
  }

  function isNumber(_) {
    return !isNaN(+_) && !(_ instanceof Date);
  }

  function isInteger(_) {
    return isNumber(_) && (_=+_) === ~~_;
  }

  function delimitedFormat(delimiter) {
    return function(data, format) {
      var delim = {delimiter: delimiter};
      return dsv(data, format ? vegaUtil.extend(format, delim) : delim);
    };
  }

  function dsv(data, format) {
    if (format.header) {
      data = format.header
        .map(vegaUtil.stringValue)
        .join(format.delimiter) + '\n' + data;
    }
    return d3Dsv.dsvFormat(format.delimiter).parse(data+'');
  }

  function isBuffer(_) {
    return (typeof Buffer === 'function' && vegaUtil.isFunction(Buffer.isBuffer))
      ? Buffer.isBuffer(_) : false;
  }

  function json(data, format) {
    var prop = (format && format.property) ? vegaUtil.field(format.property) : vegaUtil.identity;
    return vegaUtil.isObject(data) && !isBuffer(data)
      ? parseJSON(prop(data))
      : prop(JSON.parse(data));
  }

  function parseJSON(data, format) {
    return (format && format.copy)
      ? JSON.parse(JSON.stringify(data))
      : data;
  }

  function topojson(data, format) {
    var method, object, property;
    data = json(data, format);

    method = (format && (property = format.feature)) ? topojsonClient.feature
      : (format && (property = format.mesh)) ? topojsonClient.mesh
      : vegaUtil.error('Missing TopoJSON feature or mesh parameter.');

    object = (object = data.objects[property])
      ? method(data, object)
      : vegaUtil.error('Invalid TopoJSON object: ' + property);

    return object && object.features || [object];
  }

  var formats = {
    dsv: dsv,
    csv: delimitedFormat(','),
    tsv: delimitedFormat('\t'),
    json: json,
    topojson: topojson
  };

  function formats$1(name, format) {
    if (arguments.length > 1) {
      formats[name] = format;
      return this;
    } else {
      return formats.hasOwnProperty(name) ? formats[name] : null;
    }
  }

  function read(data, schema, dateParse) {
    schema = schema || {};

    var reader = formats$1(schema.type || 'json');
    if (!reader) vegaUtil.error('Unknown data format type: ' + schema.type);

    data = reader(data, schema);
    if (schema.parse) parse(data, schema.parse, dateParse);

    if (data.hasOwnProperty('columns')) delete data.columns;
    return data;
  }

  function parse(data, types, dateParse) {
    if (!data.length) return; // early exit for empty data

    dateParse = dateParse || d3TimeFormat.timeParse;

    var fields = data.columns || Object.keys(data[0]),
        parsers, datum, field, i, j, n, m;

    if (types === 'auto') types = inferTypes(data, fields);

    fields = Object.keys(types);
    parsers = fields.map(function(field) {
      var type = types[field],
          parts, pattern;

      if (type && (type.indexOf('date:') === 0 || type.indexOf('utc:') === 0)) {
        parts = type.split(/:(.+)?/, 2);  // split on first :
        pattern = parts[1];

        if ((pattern[0] === '\'' && pattern[pattern.length-1] === '\'') ||
            (pattern[0] === '"'  && pattern[pattern.length-1] === '"')) {
          pattern = pattern.slice(1, -1);
        }

        return parts[0] === 'utc' ? d3TimeFormat.utcParse(pattern) : dateParse(pattern);
      }

      if (!typeParsers[type]) {
        throw Error('Illegal format pattern: ' + field + ':' + type);
      }

      return typeParsers[type];
    });

    for (i=0, n=data.length, m=fields.length; i<n; ++i) {
      datum = data[i];
      for (j=0; j<m; ++j) {
        field = fields[j];
        datum[field] = parsers[j](datum[field]);
      }
    }
  }

  exports.loader = loader;
  exports.read = read;
  exports.inferType = inferType;
  exports.inferTypes = inferTypes;
  exports.typeParsers = typeParsers;
  exports.formats = formats$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
