'use strict'
const path = require('path')

exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}

exports.cssloader = function (options) {

}