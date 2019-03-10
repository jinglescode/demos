# pkgresolve

### Resolve a dependency from within the context of another package.

[![Build Status](https://travis-ci.org/timoxley/pkgresolve.svg)](https://travis-ci.org/timoxley/pkgresolve)

Useful for hacks, monkeypatching or wrappers that require
manipulation of the exact dependency that would be loaded by a package.

## Installation

```
npm install --save pkgresolve
```

## Example

```js
var resolve = require('pkgresolve')

// Resolve 'through' from locally installed 'tape'
resolve('through').from('tape', function(err, pkgPath) {
  // pkgPath - path to through or null
})

// Resolve 'npmconf' from globally installed 'npm'
resolve('npmconf').fromGlobal('npm', function(err, pkgPath) {
  // pkgPath - path to npmconf or null
})
```

## CLI

```coffeescript
# Resolve 'through' from locally installed 'tape'
pkgresolve tape through

# Resolve 'npmconf' from globally installed 'npm'
pkgresolve --global npm npmconf
```

### Why not `require('parent/node_modules/child')`?

Due to deduplication, `child` is not guaranteed to exist at that
location. You don't even need to call `npm dedupe` for this to happen –
npm will not install something that is already installed in the
hierarchy. `pkgresolve` is a more robust method.

### Use Responsibly.

This intentially breaks the encapsulation provided by node/npm's
module system. Don't use this unless you have to.

## See Also

* [sindresorhus/resolve-from](https://github.com/sindresorhus/resolve-from)

# License

MIT
