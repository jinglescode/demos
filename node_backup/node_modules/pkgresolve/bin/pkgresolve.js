#!/usr/bin/env node

'use strict'

var resolve = require('../')

var argv = require('minimist')(process.argv.slice(2), {
  boolean: ['g', 'global']
})

var parentName = argv._[0]
var packageName = argv._[1]
var useGlobal = !!argv.g || !!argv.global

if (!parentName || !packageName) {
  usage()
  process.exit(1)
}

function usage () {
  console.error('')
  console.error('Usage: pkgresolve [-g, --global] <parent> <child>')
  console.error('')
  console.error('  pkgresolve tape glob              # resolve package "glob" from local "tape"')
  console.error('  pkgresolve --global npm npmconf   # resolve "npmconf" from global "npm"')
  console.error('')
}

resolve._resolve(parentName, packageName, useGlobal, function (err, path) {
  if (err) {
    console.trace()
    console.error(err.message)
  }
  if (!path) {
    console.error('Not found %s in %s %s.', packageName, useGlobal ? 'global' : 'local', parentName)
    process.exit(1)
  }
  console.info(path)
})
