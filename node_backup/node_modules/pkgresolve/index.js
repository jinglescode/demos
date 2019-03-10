'use strict'

var execFile = require('child_process').execFile

module.exports = function (pkgName) {
  return {
    from: function from (from, fn) {
      return module.exports._resolve(from, pkgName, false, fn)
    },
    fromGlobal: function fromGlobal (from, fn) {
      return module.exports._resolve(from, pkgName, true, fn)
    }
  }
}

module.exports._resolve = function _resolve (from, pkgName, useGlobal, fn) {
  var cmd = 'npm'
  var args = [
    'explore',
    from,
    (useGlobal ? '-g' : ''),
    '--silent',
    '--',
    process.execPath,
    '-p',
    'try {require.resolve("' + pkgName + '")}catch(e) {""}'
  ]

  execFile(cmd, args, function (err, pkgPath) {
    if (err) return fn(null, null)
    pkgPath = pkgPath || ''
    pkgPath = pkgPath.trim()
    if (!pkgPath) return fn(null, null)
    return fn(null, pkgPath)
  })
}
